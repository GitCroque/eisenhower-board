import { FormEvent, useState } from 'react';
import { MailCheck } from 'lucide-react';
import { useAuth } from '@/auth/AuthContext';
import { useLanguage } from '@/i18n';
import { LanguageSelector } from './LanguageSelector';
import { ThemeToggle } from './ThemeToggle';
import { Layout } from './Layout';

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function LoginPage() {
  const { requestMagicLink } = useAuth();
  const { t } = useLanguage();
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
      await requestMagicLink(normalizedEmail);
      setSubmittedEmail(normalizedEmail);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to send sign-in link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout maxWidth="max-w-xl">
      <header className="mb-8 flex items-center justify-end gap-2">
        <LanguageSelector />
        <ThemeToggle />
      </header>

      <div className="rounded-2xl border border-white/60 bg-white/70 p-8 backdrop-blur-md dark:border-slate-700/60 dark:bg-slate-800/70">
        <h1 className="mb-2 text-3xl font-bold text-slate-800 dark:text-white">
          {t.auth.signInTitle}
        </h1>
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
    </Layout>
  );
}
