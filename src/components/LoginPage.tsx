import { FormEvent, useState } from 'react';
import { MailCheck, AlertCircle, Calendar, Users, Trash2 } from 'lucide-react';
import { useAuth } from '@/auth/AuthContext';
import { useLanguage } from '@/i18n';
import { LanguageSelector } from './LanguageSelector';
import { ThemeToggle } from './ThemeToggle';
import { Layout } from './Layout';

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const QUADRANT_MINI = [
  {
    key: 'urgentImportant' as const,
    color: 'bg-red-100 border-red-300 dark:bg-red-950/40 dark:border-red-800',
    iconColor: 'text-red-600 dark:text-red-400',
    Icon: AlertCircle,
  },
  {
    key: 'notUrgentImportant' as const,
    color: 'bg-blue-100 border-blue-300 dark:bg-blue-950/40 dark:border-blue-800',
    iconColor: 'text-blue-600 dark:text-blue-400',
    Icon: Calendar,
  },
  {
    key: 'urgentNotImportant' as const,
    color: 'bg-yellow-100 border-yellow-300 dark:bg-yellow-950/40 dark:border-yellow-800',
    iconColor: 'text-amber-600 dark:text-amber-400',
    Icon: Users,
  },
  {
    key: 'notUrgentNotImportant' as const,
    color: 'bg-gray-100 border-gray-300 dark:bg-gray-800/40 dark:border-gray-700',
    iconColor: 'text-slate-600 dark:text-slate-400',
    Icon: Trash2,
  },
] as const;

export function LoginPage() {
  const { requestMagicLink } = useAuth();
  const { t, language } = useLanguage();
  const [email, setEmail] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = isValidEmail(email.trim()) && !loading;

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const normalizedEmail = email.trim().toLowerCase();
      await requestMagicLink(normalizedEmail, language);
      setSubmittedEmail(normalizedEmail);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to send sign-in link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout maxWidth="max-w-4xl">
      <header className="mb-8 flex items-center justify-end gap-2">
        <LanguageSelector />
        <ThemeToggle />
      </header>

      <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
        {/* Description section */}
        <div className="space-y-6">
          <div>
            <h1 className="mb-3 text-3xl font-bold text-slate-800 dark:text-white">
              {t.title}
            </h1>
            <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
              {t.landing.description}
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {t.landing.quadrantsTitle}
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {QUADRANT_MINI.map(({ key, color, iconColor, Icon }) => (
                <div
                  key={key}
                  className={`rounded-lg border p-3 ${color}`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className={`h-4 w-4 shrink-0 ${iconColor}`} />
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium text-slate-800 dark:text-slate-200">
                        {t.quadrants[key].title}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {t.quadrants[key].description}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Login form */}
        <div className="rounded-2xl border border-white/60 bg-white/70 p-8 backdrop-blur-md dark:border-slate-700/60 dark:bg-slate-800/70">
          <h2 className="mb-2 text-2xl font-bold text-slate-800 dark:text-white">
            {t.auth.signInTitle}
          </h2>
          <p className="mb-6 text-slate-600 dark:text-slate-400">
            {t.auth.signInSubtitle}
          </p>

          <form className="space-y-4" onSubmit={onSubmit}>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                {t.auth.emailLabel}
              </span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
              />
            </label>

            <button
              type="submit"
              disabled={!canSubmit}
              className="inline-flex w-full items-center justify-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300"
            >
              {loading ? t.auth.sendingLink : t.auth.sendMagicLink}
            </button>
          </form>

          {submittedEmail && (
            <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:text-emerald-300">
              <div className="mb-1 flex items-center gap-2 font-medium">
                <MailCheck className="h-4 w-4" />
                {t.auth.checkInbox}
              </div>
              <p className="text-sm">
                {t.auth.checkInboxDescription} <strong>{submittedEmail}</strong>. {t.auth.linkExpiresIn}
              </p>
            </div>
          )}

          {error && (
            <p className="mt-4 text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
}
