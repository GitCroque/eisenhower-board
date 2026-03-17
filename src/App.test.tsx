import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

const mockFetch = vi.fn();

beforeEach(() => {
  vi.stubGlobal('fetch', mockFetch);
  mockFetch.mockReset();
  window.history.pushState({}, '', '/');
  window.localStorage.clear();
});

describe('App', () => {
  it('shows a retry screen when the auth bootstrap fails', async () => {
    mockFetch.mockImplementation(async (url: string) => {
      if (url === '/api/auth/me') {
        return new Response(JSON.stringify({ error: 'fail' }), { status: 500 });
      }
      return new Response('', { status: 404 });
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /unable to verify your session/i })).toBeInTheDocument();
    });

    expect(screen.queryByRole('heading', { name: /sign in to eisenhower board/i })).not.toBeInTheDocument();
  });

  it('redirects unknown authenticated routes to the matrix', async () => {
    window.history.pushState({}, '', '/unknown');

    mockFetch.mockImplementation(async (url: string, options?: RequestInit) => {
      if (url === '/api/auth/me') {
        return new Response(JSON.stringify({
          authenticated: true,
          user: { email: 'test@example.com' },
        }), { status: 200 });
      }

      if (url === '/api/csrf-token') {
        return new Response(JSON.stringify({ token: 'csrf-token' }), { status: 200 });
      }

      if (url === '/api/tasks' && (!options?.method || options.method === 'GET')) {
        return new Response(JSON.stringify({
          urgentImportant: [],
          notUrgentImportant: [],
          urgentNotImportant: [],
          notUrgentNotImportant: [],
        }), { status: 200 });
      }

      return new Response('', { status: 404 });
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /eisenhower matrix/i })).toBeInTheDocument();
    });

    expect(window.location.pathname).toBe('/');
  });
});
