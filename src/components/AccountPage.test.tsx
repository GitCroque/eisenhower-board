import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { LanguageProvider } from '@/i18n';
import { CsrfProvider } from '@/hooks/CsrfContext';
import { AuthProvider } from '@/auth/AuthContext';
import { AccountPage } from './AccountPage';

const mockFetch = vi.fn();

function renderAccountPage() {
  return render(
    <MemoryRouter initialEntries={['/account']}>
      <LanguageProvider>
        <CsrfProvider>
          <AuthProvider>
            <Routes>
              <Route path="/account" element={<AccountPage />} />
              <Route path="/" element={<div>Home</div>} />
            </Routes>
          </AuthProvider>
        </CsrfProvider>
      </LanguageProvider>
    </MemoryRouter>,
  );
}

beforeEach(() => {
  vi.stubGlobal('fetch', mockFetch);
  mockFetch.mockReset();
  window.localStorage.setItem('eisenhower-language', JSON.stringify('fr'));
});

describe('AccountPage', () => {
  it('renders account page with current email', async () => {
    mockFetch.mockImplementation(async (url: string) => {
      if (url === '/api/csrf-token') {
        return new Response(JSON.stringify({ token: 'csrf-token' }), { status: 200 });
      }

      if (url === '/api/auth/me') {
        return new Response(JSON.stringify({
          authenticated: true,
          user: { email: 'test@example.com', isAdmin: false },
        }), { status: 200 });
      }

      return new Response('', { status: 404 });
    });

    renderAccountPage();

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /compte/i })).toBeInTheDocument();
    });

    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /changer d'email/i })).toBeInTheDocument();
  });

  it('shows email change form and submits', async () => {
    const user = userEvent.setup();

    mockFetch.mockImplementation(async (url: string, options?: RequestInit) => {
      if (url === '/api/csrf-token') {
        return new Response(JSON.stringify({ token: 'csrf-token' }), { status: 200 });
      }

      if (url === '/api/auth/me') {
        return new Response(JSON.stringify({
          authenticated: true,
          user: { email: 'test@example.com', isAdmin: false },
        }), { status: 200 });
      }

      if (url === '/api/account/change-email' && options?.method === 'POST') {
        return new Response(JSON.stringify({ success: true }), { status: 200 });
      }

      return new Response('', { status: 404 });
    });

    renderAccountPage();

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /compte/i })).toBeInTheDocument();
    });

    const emailInput = screen.getByPlaceholderText(/nouvel email/i);
    await user.type(emailInput, 'new@example.com');

    const changeButton = screen.getByRole('button', { name: /changer d'email/i });
    await user.click(changeButton);

    await waitFor(() => {
      expect(screen.getByText(/email de vérification envoyé/i)).toBeInTheDocument();
    });
  });

  it('shows delete account confirmation', async () => {
    const user = userEvent.setup();

    mockFetch.mockImplementation(async (url: string) => {
      if (url === '/api/csrf-token') {
        return new Response(JSON.stringify({ token: 'csrf-token' }), { status: 200 });
      }

      if (url === '/api/auth/me') {
        return new Response(JSON.stringify({
          authenticated: true,
          user: { email: 'test@example.com', isAdmin: false },
        }), { status: 200 });
      }

      return new Response('', { status: 404 });
    });

    renderAccountPage();

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /compte/i })).toBeInTheDocument();
    });

    const deleteButton = screen.getByRole('button', { name: /supprimer mon compte/i });
    await user.click(deleteButton);

    await waitFor(() => {
      expect(screen.getByText(/saisissez votre email pour confirmer/i)).toBeInTheDocument();
    });
  });
});
