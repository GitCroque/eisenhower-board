import { useCallback, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Trash2, Users } from 'lucide-react';
import { useCsrf } from '@/hooks/CsrfContext';
import { useAuth } from '@/auth/AuthContext';
import { useLanguage } from '@/i18n';
import { Layout } from './Layout';

interface AdminUser {
  id: string;
  email: string;
  createdAt: number;
  lastLoginAt: number | null;
  taskCount: number;
}

interface AdminStats {
  totalUsers: number;
  activeUsers30d: number;
}

function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function AdminPage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { fetchCsrfToken, fetchWithCsrf } = useCsrf();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  if (!user?.isAdmin) {
    return <Navigate to="/" replace />;
  }

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [usersRes, statsRes] = await Promise.all([
        fetch('/api/admin/users', { credentials: 'same-origin' }),
        fetch('/api/admin/stats', { credentials: 'same-origin' }),
      ]);
      if (usersRes.ok) {
        const data = await usersRes.json() as { users: AdminUser[] };
        setUsers(data.users);
      }
      if (statsRes.ok) {
        const data = await statsRes.json() as AdminStats;
        setStats(data);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void Promise.all([fetchCsrfToken(), fetchData()]);
  }, [fetchCsrfToken, fetchData]);

  const deleteUser = useCallback(async (userId: string) => {
    try {
      setDeletingId(userId);
      const response = await fetchWithCsrf(`/api/admin/users/${userId}`, { method: 'DELETE' });
      if (response.ok) {
        setUsers(prev => prev.filter(u => u.id !== userId));
        if (stats) setStats({ ...stats, totalUsers: stats.totalUsers - 1 });
      } else {
        const body = await response.text();
        console.error('Delete user failed:', response.status, body);
      }
    } catch (err) {
      console.error('Delete user failed:', err);
    } finally {
      setDeletingId(null);
      setConfirmDeleteId(null);
    }
  }, [fetchWithCsrf, stats]);

  return (
    <Layout maxWidth="max-w-5xl">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <ShieldCheck className="h-6 w-6 text-amber-500" />
          <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            {t.admin.title}
          </h1>
        </div>

        {stats && (
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-200 bg-white/60 p-4 backdrop-blur dark:border-slate-700 dark:bg-slate-800/60">
              <p className="text-sm text-slate-500 dark:text-slate-400">{t.admin.totalUsers}</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stats.totalUsers}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white/60 p-4 backdrop-blur dark:border-slate-700 dark:bg-slate-800/60">
              <p className="text-sm text-slate-500 dark:text-slate-400">{t.admin.activeUsers30d}</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stats.activeUsers30d}</p>
            </div>
          </div>
        )}

        <div className="rounded-xl border border-slate-200 bg-white/60 backdrop-blur dark:border-slate-700 dark:bg-slate-800/60">
          <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-3 dark:border-slate-700">
            <Users className="h-4 w-4 text-slate-500" />
            <h2 className="font-medium text-slate-900 dark:text-slate-100">{t.admin.users}</h2>
          </div>

          {loading ? (
            <div className="flex min-h-[200px] items-center justify-center">
              <p className="text-slate-500">...</p>
            </div>
          ) : users.length === 0 ? (
            <p className="p-4 text-slate-500">{t.admin.never}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-fixed text-sm">
                <colgroup>
                  <col />
                  <col className="w-36" />
                  <col className="w-44" />
                  <col className="w-20" />
                  <col className="w-32" />
                </colgroup>
                <thead>
                  <tr className="border-b border-slate-200 text-left text-slate-500 dark:border-slate-700 dark:text-slate-400">
                    <th className="px-4 py-2 font-medium">{t.admin.email}</th>
                    <th className="px-4 py-2 font-medium">{t.admin.createdAt}</th>
                    <th className="px-4 py-2 font-medium">{t.admin.lastLoginAt}</th>
                    <th className="px-4 py-2 font-medium">{t.admin.taskCount}</th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id} className="border-b border-slate-100 dark:border-slate-700/50">
                      <td className="px-4 py-2.5 text-slate-900 dark:text-slate-100">{u.email}</td>
                      <td className="px-4 py-2.5 text-slate-600 dark:text-slate-400">{formatDate(u.createdAt)}</td>
                      <td className="px-4 py-2.5 text-slate-600 dark:text-slate-400">
                        {u.lastLoginAt ? formatDate(u.lastLoginAt) : t.admin.never}
                      </td>
                      <td className="px-4 py-2.5 text-slate-600 dark:text-slate-400">{u.taskCount}</td>
                      <td className="h-10 px-4 text-right">
                        {u.email !== user.email && (
                          confirmDeleteId === u.id ? (
                            <span className="inline-flex items-center gap-1">
                              <button
                                onClick={() => void deleteUser(u.id)}
                                disabled={deletingId === u.id}
                                className="rounded bg-red-600 px-2 py-1 text-xs font-medium text-white transition hover:bg-red-700 disabled:opacity-50"
                              >
                                {deletingId === u.id ? '...' : 'OK'}
                              </button>
                              <button
                                onClick={() => setConfirmDeleteId(null)}
                                className="rounded px-2 py-1 text-xs text-slate-500 transition hover:bg-slate-100 dark:hover:bg-slate-700"
                              >
                                {t.tasks.cancel}
                              </button>
                            </span>
                          ) : (
                            <button
                              onClick={() => setConfirmDeleteId(u.id)}
                              className="rounded p-1 text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950"
                              title={t.admin.deleteUser}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
