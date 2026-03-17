import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { LanguageProvider } from '@/i18n';
import { CsrfProvider } from '@/hooks/CsrfContext';
import { SessionsPage } from './SessionsPage';

const mockFetch = vi.fn();

function renderSessionsPage() {
  return render(
    <MemoryRouter initialEntries={['/sessions']}>
      <LanguageProvider>
        <CsrfProvider>
          <Routes>
            <Route path="/sessions" element={<SessionsPage />} />
          </Routes>
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

describe('SessionsPage', () => {
  it('renders translated session copy', async () => {
    mockFetch.mockImplementation(async (url: string) => {
      if (url === '/api/csrf-token') {
        return new Response(JSON.stringify({ token: 'csrf-token' }), { status: 200 });
      }

      if (url === '/api/auth/sessions') {
        return new Response(JSON.stringify({
          sessions: [
            {
              id: 'session-1',
              createdAt: 1000,
              lastSeenAt: 2000,
              ip: null,
              userAgent: null,
              current: true,
            },
          ],
        }), { status: 200 });
      }

      return new Response('', { status: 404 });
    });

    renderSessionsPage();

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /sessions actives/i })).toBeInTheDocument();
    });

    expect(screen.getByText(/retour à la matrice/i)).toBeInTheDocument();
    expect(screen.getByText(/actuelle/i)).toBeInTheDocument();
  });
});
