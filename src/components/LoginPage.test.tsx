import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageProvider } from '@/i18n';
import { CsrfProvider } from '@/hooks/CsrfContext';
import { AuthProvider } from '@/auth/AuthContext';
import { LoginPage } from './LoginPage';

const mockFetch = vi.fn();

function renderLoginPage() {
  return render(
    <LanguageProvider>
      <CsrfProvider>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </CsrfProvider>
    </LanguageProvider>,
  );
}

function mockMagicLinkResponse(status: number) {
  mockFetch.mockImplementation(async (url: string, options?: RequestInit) => {
    if (url === '/api/auth/me') {
      return new Response(JSON.stringify({ authenticated: false }), { status: 200 });
    }

    if (url === '/api/auth/magic-link' && options?.method === 'POST') {
      if (status === 200) {
        return new Response(JSON.stringify({ success: true }), { status: 200 });
      }
      return new Response(JSON.stringify({ error: 'fail' }), { status });
    }

    return new Response('', { status: 404 });
  });
}

beforeEach(() => {
  vi.stubGlobal('fetch', mockFetch);
  mockFetch.mockReset();
});

describe('LoginPage', () => {
  it('disables submit until a valid email is entered', async () => {
    const user = userEvent.setup();
    mockMagicLinkResponse(200);

    renderLoginPage();

    const submitButton = screen.getByRole('button', { name: /send magic link/i });
    expect(submitButton).toBeDisabled();

    await user.type(screen.getByLabelText(/email/i), 'user@example.com');

    expect(submitButton).toBeEnabled();
  });

  it('shows the confirmation message after a successful submission', async () => {
    const user = userEvent.setup();
    mockMagicLinkResponse(200);

    renderLoginPage();

    await user.type(screen.getByLabelText(/email/i), 'User@Example.com');
    await user.click(screen.getByRole('button', { name: /send magic link/i }));

    await waitFor(() => {
      expect(screen.getByText(/check your inbox/i)).toBeInTheDocument();
    });

    expect(screen.getByText('user@example.com')).toBeInTheDocument();
  });

  it('shows a generic error message when the request fails', async () => {
    const user = userEvent.setup();
    mockMagicLinkResponse(500);

    renderLoginPage();

    await user.type(screen.getByLabelText(/email/i), 'user@example.com');
    await user.click(screen.getByRole('button', { name: /send magic link/i }));

    await waitFor(() => {
      expect(screen.getByText(/unable to send the sign-in link/i)).toBeInTheDocument();
    });

    expect(screen.queryByText(/check your inbox/i)).not.toBeInTheDocument();
  });

  it('shows a dedicated rate limit message on 429', async () => {
    const user = userEvent.setup();
    mockMagicLinkResponse(429);

    renderLoginPage();

    await user.type(screen.getByLabelText(/email/i), 'user@example.com');
    await user.click(screen.getByRole('button', { name: /send magic link/i }));

    await waitFor(() => {
      expect(screen.getByText(/too many attempts/i)).toBeInTheDocument();
    });

    expect(screen.queryByText(/unable to send the sign-in link/i)).not.toBeInTheDocument();
  });
});
