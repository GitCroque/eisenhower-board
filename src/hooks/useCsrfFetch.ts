import { useCallback, useRef } from 'react';

const API_BASE = '/api';

export function useCsrfFetch() {
  const csrfTokenRef = useRef<string | null>(null);

  const fetchCsrfToken = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE}/csrf-token`);
      if (response.ok) {
        const data = await response.json();
        csrfTokenRef.current = data.token;
      }
    } catch {
      console.error('Failed to fetch CSRF token');
    }
  }, []);

  const fetchWithCsrf = useCallback(async (url: string, options: RequestInit): Promise<Response> => {
    if (!csrfTokenRef.current) {
      await fetchCsrfToken();
    }

    const headers: HeadersInit = {
      ...options.headers,
      'X-CSRF-Token': csrfTokenRef.current || '',
    };

    const response = await fetch(url, { ...options, headers });

    if (response.status === 403) {
      await fetchCsrfToken();
      const retryHeaders: HeadersInit = {
        ...options.headers,
        'X-CSRF-Token': csrfTokenRef.current || '',
      };
      return fetch(url, { ...options, headers: retryHeaders });
    }

    return response;
  }, [fetchCsrfToken]);

  return { fetchCsrfToken, fetchWithCsrf };
}
