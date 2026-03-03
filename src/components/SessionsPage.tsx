import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Trash2 } from 'lucide-react';
import { useCsrf } from '@/hooks/CsrfContext';
import { Layout } from './Layout';

interface AuthSession {
  id: string;
  createdAt: number;
  lastSeenAt: number;
  ip: string | null;
  userAgent: string | null;
  current: boolean;
}

interface SessionsResponse {
  sessions: AuthSession[];
}

function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function SessionsPage() {
  const [sessions, setSessions] = useState<AuthSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [revokingId, setRevokingId] = useState<string | null>(null);
  const [revokingOthers, setRevokingOthers] = useState(false);
  const { fetchCsrfToken, fetchWithCsrf } = useCsrf();

  const fetchSessions = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await fetch('/api/auth/sessions', {
        credentials: 'same-origin',
      });
      if (response.status === 401) {
        window.location.reload();
        return;
      }
      if (!response.ok) {
        throw new Error('Failed to fetch sessions');
      }
      const data = await response.json() as SessionsResponse;
      setSessions(data.sessions);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void Promise.all([fetchCsrfToken(), fetchSessions()]);
  }, [fetchCsrfToken, fetchSessions]);

  const revokeSession = useCallback(async (sessionId: string) => {
    try {
      setError(null);
      setRevokingId(sessionId);
      const response = await fetchWithCsrf(`/api/auth/sessions/${sessionId}`, {
        method: 'DELETE',
      });
      if (response.status === 401) {
        window.location.reload();
        return;
      }
      if (!response.ok) {
        throw new Error('Failed to revoke session');
      }
      setSessions((prev) => prev.filter((session) => session.id !== sessionId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setRevokingId(null);
    }
  }, [fetchWithCsrf]);

  const revokeOtherSessions = useCallback(async () => {
    try {
      setError(null);
      setRevokingOthers(true);
      const response = await fetchWithCsrf('/api/auth/sessions/revoke-others', {
        method: 'POST',
      });
      if (response.status === 401) {
        window.location.reload();
        return;
      }
      if (!response.ok) {
        throw new Error('Failed to revoke other sessions');
      }
      setSessions((prev) => prev.filter((session) => session.current));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setRevokingOthers(false);
    }
  }, [fetchWithCsrf]);

  const hasOtherSessions = sessions.some((session) => !session.current);

  if (loading) {
    return (
      <Layout maxWidth="max-w-4xl">
        <div className="flex min-h-[400px] items-center justify-center">
          <p className="text-slate-600 dark:text-slate-400">Loading sessions...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout maxWidth="max-w-4xl">
      <header className="mb-8">
        <Link
          to="/"
          className="mb-4 inline-flex items-center gap-2 text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to matrix
        </Link>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Active sessions</h1>
          <button
            onClick={() => void revokeOtherSessions()}
            disabled={!hasOtherSessions || revokingOthers}
            className="inline-flex items-center gap-2 rounded-lg border border-white/60 bg-white/70 px-3 py-2 text-sm font-medium text-slate-700 backdrop-blur-md transition-all duration-200 hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700/60 dark:bg-slate-800/70 dark:text-slate-200 dark:hover:bg-slate-800/90"
          >
            <Shield className="h-4 w-4" />
            {revokingOthers ? 'Revoking...' : 'Revoke other sessions'}
          </button>
        </div>
      </header>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300">
          {error}
        </div>
      )}

      {sessions.length === 0 ? (
        <div className="rounded-xl border border-white/60 bg-white/70 p-8 text-center backdrop-blur-md dark:border-slate-700/60 dark:bg-slate-800/70">
          <p className="text-slate-500 dark:text-slate-400">No active sessions.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="flex items-start justify-between gap-4 rounded-xl border border-white/60 bg-white/70 p-4 backdrop-blur-md dark:border-slate-700/60 dark:bg-slate-800/70"
            >
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
                    {session.userAgent || 'Unknown device'}
                  </p>
                  {session.current && (
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                      Current
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">IP: {session.ip || 'Unknown'}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Created: {formatDate(session.createdAt)}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Last seen: {formatDate(session.lastSeenAt)}
                </p>
              </div>
              {!session.current && (
                <button
                  onClick={() => void revokeSession(session.id)}
                  disabled={revokingId === session.id}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-red-950/30"
                  aria-label="Revoke session"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}
