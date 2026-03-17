import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { LanguageProvider } from '@/i18n';
import { CsrfProvider } from '@/hooks/CsrfContext';
import { ArchivePage } from './ArchivePage';

const mockFetch = vi.fn();

function renderArchivePage(initialEntry: string) {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <LanguageProvider>
        <CsrfProvider>
          <Routes>
            <Route path="/archive" element={<ArchivePage />} />
          </Routes>
        </CsrfProvider>
      </LanguageProvider>
    </MemoryRouter>,
  );
}

beforeEach(() => {
  vi.stubGlobal('fetch', mockFetch);
  mockFetch.mockReset();
});

describe('ArchivePage', () => {
  it('uses URL search params as the source of truth', async () => {
    const archivedUrls: string[] = [];

    mockFetch.mockImplementation(async (url: string) => {
      if (url === '/api/csrf-token') {
        return new Response(JSON.stringify({ token: 'csrf-token' }), { status: 200 });
      }
      if (url.startsWith('/api/archived-tasks')) {
        archivedUrls.push(url);
        return new Response(JSON.stringify({
          tasks: [],
          total: 0,
          page: 2,
          pageSize: 20,
        }), { status: 200 });
      }
      return new Response('', { status: 404 });
    });

    renderArchivePage('/archive?page=2&q=focus&quadrant=urgentImportant&from=2026-03-01&to=2026-03-08');

    await waitFor(() => {
      expect(archivedUrls).toHaveLength(1);
    });

    expect(archivedUrls[0]).toContain('page=2');
    expect(archivedUrls[0]).toContain('q=focus');
    expect(archivedUrls[0]).toContain('quadrant=urgentImportant');
    expect(archivedUrls[0]).toContain('from=');
    expect(archivedUrls[0]).toContain('to=');
    expect(screen.getByDisplayValue('focus')).toBeInTheDocument();
  });

  it('recalibrates to the previous page when the current one becomes empty', async () => {
    const archivedUrls: string[] = [];

    mockFetch.mockImplementation(async (url: string, options?: RequestInit) => {
      if (url === '/api/csrf-token') {
        return new Response(JSON.stringify({ token: 'csrf-token' }), { status: 200 });
      }

      if (url.startsWith('/api/archived-tasks?page=2') && (!options?.method || options.method === 'GET')) {
        archivedUrls.push(url);
        return new Response(JSON.stringify({
          tasks: [
            {
              id: 'archived-1',
              text: 'Archived task',
              createdAt: 1000,
              completedAt: 2000,
              quadrant: 'urgentImportant',
            },
          ],
          total: 21,
          page: 2,
          pageSize: 20,
        }), { status: 200 });
      }

      if (url.startsWith('/api/archived-tasks?page=1') && (!options?.method || options.method === 'GET')) {
        archivedUrls.push(url);
        return new Response(JSON.stringify({
          tasks: [],
          total: 20,
          page: 1,
          pageSize: 20,
        }), { status: 200 });
      }

      if (url === '/api/archived-tasks/archived-1' && options?.method === 'DELETE') {
        return new Response(JSON.stringify({ success: true }), { status: 200 });
      }

      return new Response('', { status: 404 });
    });

    const user = userEvent.setup();
    renderArchivePage('/archive?page=2');

    await waitFor(() => {
      expect(screen.getByText('Archived task')).toBeInTheDocument();
    });

    await user.click(screen.getByRole('button', { name: /delete permanently/i }));
    await user.click(screen.getByRole('button', { name: /^delete$/i }));

    await waitFor(() => {
      expect(archivedUrls.some((url) => url.startsWith('/api/archived-tasks?page=1'))).toBe(true);
    });
  });
});
