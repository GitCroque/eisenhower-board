import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useCsrf } from '@/hooks/CsrfContext';

interface AuthUser {
  email: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  authCheckFailed: boolean;
  requestMagicLink: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

interface AuthMeResponse {
  authenticated: boolean;
  user?: AuthUser;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE = '/api';

async function fetchAuthMe(): Promise<AuthMeResponse> {
  const response = await fetch(`${API_BASE}/auth/me`, {
    credentials: 'same-origin',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch authentication state');
  }

  return response.json() as Promise<AuthMeResponse>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [authCheckFailed, setAuthCheckFailed] = useState(false);
  const { fetchWithCsrf } = useCsrf();

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchAuthMe();
      setUser(data.authenticated && data.user ? data.user : null);
      setAuthCheckFailed(false);
    } catch {
      setAuthCheckFailed(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const requestMagicLink = useCallback(async (email: string) => {
    const response = await fetch(`${API_BASE}/auth/magic-link`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error('Unable to process sign-in request. Please try again.');
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetchWithCsrf(`${API_BASE}/auth/logout`, {
        method: 'POST',
      });
    } catch {
      // Local logout is more important than server logout
    } finally {
      setAuthCheckFailed(false);
      setUser(null);
    }
  }, [fetchWithCsrf]);

  const value = useMemo<AuthContextType>(() => ({
    user,
    loading,
    authCheckFailed,
    requestMagicLink,
    logout,
    refresh,
  }), [user, loading, authCheckFailed, requestMagicLink, logout, refresh]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
