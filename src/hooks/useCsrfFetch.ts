import { useCallback, useRef } from 'react';

const API_BASE = '/api';

export function useCsrfFetch() {
  const csrfTokenRef = useRef<string | null>(null);
  const refreshPromiseRef = useRef<Promise<void> | null>(null);

  const fetchCsrfToken = useCallback(async () => {
    // Deduplicate concurrent refresh calls
    if (refreshPromiseRef.current) {
      return refreshPromiseRef.current;
    }

    const promise = (async () => {
      try {
        const response = await fetch(`${API_BASE}/csrf-token`, {
          credentials: 'same-origin',
        });
        if (response.ok) {
          const data = await response.json();
          csrfTokenRef.current = data.token;
        } else if (response.status === 401) {
          csrfTokenRef.current = null;
        }
      } catch {
        console.error('Failed to fetch CSRF token');
      } finally {
        refreshPromiseRef.current = null;
      }
    })();

    refreshPromiseRef.current = promise;
    return promise;
  }, []);

  const fetchWithCsrf = useCallback(async (url: string, options: RequestInit): Promise<Response> => {
    if (!csrfTokenRef.current) {
      await fetchCsrfToken();
    }

    const headers: HeadersInit = {
      ...options.headers,
      'X-CSRF-Token': csrfTokenRef.current || '',
    };

    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'same-origin',
    });

    if (response.status === 403) {
      await fetchCsrfToken();
      const retryHeaders: HeadersInit = {
        ...options.headers,
        'X-CSRF-Token': csrfTokenRef.current || '',
      };
      return fetch(url, {
        ...options,
        headers: retryHeaders,
        credentials: 'same-origin',
      });
    }

    return response;
  }, [fetchCsrfToken]);

  return { fetchCsrfToken, fetchWithCsrf };
}
