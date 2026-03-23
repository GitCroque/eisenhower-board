import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { LanguageProvider } from '@/i18n';
import { CsrfProvider } from '@/hooks/CsrfContext';
import { AdminPage } from './AdminPage';

// Mock useAuth to avoid the AuthProvider timing issue:
// AdminPage checks `user?.isAdmin` synchronously on first render and redirects
// before AuthProvider's async fetch can resolve.
vi.mock('@/auth/AuthContext', () => ({
  useAuth: vi.fn(),
}));

import { useAuth } from '@/auth/AuthContext';

const mockUseAuth = vi.mocked(useAuth);
const mockFetch = vi.fn();

function renderAdminPage() {
  return render(
    <MemoryRouter initialEntries={['/admin']}>
      <LanguageProvider>
        <CsrfProvider>
          <Routes>
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/" element={<p>redirected-home</p>} />
          </Routes>
        </CsrfProvider>
      </LanguageProvider>
    </MemoryRouter>,
  );
}

function mockAdminAuth(overrides?: Partial<ReturnType<typeof useAuth>>) {
  mockUseAuth.mockReturnValue({
    user: { email: 'admin@test.com', isAdmin: true },
    loading: false,
    authCheckFailed: false,
    requestMagicLink: vi.fn(),
    logout: vi.fn(),
    refresh: vi.fn(),
    deleteAccount: vi.fn(),
    changeEmail: vi.fn(),
    ...overrides,
  });
}

beforeEach(() => {
  vi.stubGlobal('fetch', mockFetch);
  mockFetch.mockReset();
  mockUseAuth.mockReset();
  window.localStorage.setItem('eisenhower-language', JSON.stringify('fr'));
});

describe('AdminPage', () => {
  it('renders admin page with users list and stats', async () => {
    mockAdminAuth();

    mockFetch.mockImplementation(async (url: string) => {
      if (url === '/api/csrf-token') {
        return new Response(JSON.stringify({ token: 'csrf-token' }), { status: 200 });
      }

      if (url.startsWith('/api/admin/users')) {
        return new Response(JSON.stringify({
          users: [
            {
              id: 'user-1',
              email: 'alice@test.com',
              createdAt: 1700000000000,
              lastLoginAt: 1710000000000,
              taskCount: 5,
            },
            {
              id: 'user-2',
              email: 'bob@test.com',
              createdAt: 1700000000000,
              lastLoginAt: null,
              taskCount: 0,
            },
          ],
          total: 2,
          page: 1,
          pageSize: 50,
        }), { status: 200 });
      }

      if (url === '/api/admin/stats') {
        return new Response(JSON.stringify({
          totalUsers: 2,
          activeUsers30d: 1,
        }), { status: 200 });
      }

      return new Response('', { status: 404 });
    });

    renderAdminPage();

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /administration/i })).toBeInTheDocument();
    });

    // Stats
    await waitFor(() => {
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument();
    });
    expect(screen.getByText(/utilisateurs au total/i)).toBeInTheDocument();
    expect(screen.getByText(/utilisateurs actifs/i)).toBeInTheDocument();

    // Users list
    expect(screen.getByText('alice@test.com')).toBeInTheDocument();
    expect(screen.getByText('bob@test.com')).toBeInTheDocument();
  });

  it('redirects non-admin to home', async () => {
    mockUseAuth.mockReturnValue({
      user: { email: 'user@test.com', isAdmin: false },
      loading: false,
      authCheckFailed: false,
      requestMagicLink: vi.fn(),
      logout: vi.fn(),
      refresh: vi.fn(),
      deleteAccount: vi.fn(),
      changeEmail: vi.fn(),
    });

    renderAdminPage();

    await waitFor(() => {
      expect(screen.getByText('redirected-home')).toBeInTheDocument();
    });

    expect(screen.queryByRole('heading', { name: /administration/i })).not.toBeInTheDocument();
  });

  it('deletes a user after confirmation', async () => {
    mockAdminAuth();

    const deletedUrls: string[] = [];

    mockFetch.mockImplementation(async (url: string, options?: RequestInit) => {
      if (url === '/api/csrf-token') {
        return new Response(JSON.stringify({ token: 'csrf-token' }), { status: 200 });
      }

      if (url.startsWith('/api/admin/users') && (!options?.method || options.method === 'GET')) {
        return new Response(JSON.stringify({
          users: [
            {
              id: 'user-1',
              email: 'alice@test.com',
              createdAt: 1700000000000,
              lastLoginAt: 1710000000000,
              taskCount: 5,
            },
            {
              id: 'user-2',
              email: 'bob@test.com',
              createdAt: 1700000000000,
              lastLoginAt: null,
              taskCount: 0,
            },
          ],
          total: 2,
          page: 1,
          pageSize: 50,
        }), { status: 200 });
      }

      if (url === '/api/admin/stats') {
        return new Response(JSON.stringify({
          totalUsers: 2,
          activeUsers30d: 1,
        }), { status: 200 });
      }

      if (url.startsWith('/api/admin/users/') && options?.method === 'DELETE') {
        deletedUrls.push(url);
        return new Response(JSON.stringify({ success: true }), { status: 200 });
      }

      return new Response('', { status: 404 });
    });

    const user = userEvent.setup();
    renderAdminPage();

    // Wait for users to be displayed
    await waitFor(() => {
      expect(screen.getByText('alice@test.com')).toBeInTheDocument();
    });

    // Admin's own email is admin@test.com, so both alice and bob show the trash icon.
    // Click the first trash button (alice).
    const trashButtons = screen.getAllByTitle(/supprimer l'utilisateur/i);
    await user.click(trashButtons[0]);

    // Confirmation: click OK
    await user.click(screen.getByRole('button', { name: 'OK' }));

    // Assert DELETE was called for user-1
    await waitFor(() => {
      expect(deletedUrls).toHaveLength(1);
    });
    expect(deletedUrls[0]).toBe('/api/admin/users/user-1');

    // The user should be removed from the DOM
    expect(screen.queryByText('alice@test.com')).not.toBeInTheDocument();
    expect(screen.getByText('bob@test.com')).toBeInTheDocument();
  });
});
