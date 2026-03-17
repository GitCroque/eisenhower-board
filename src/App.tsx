import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { Archive, Shield, LogOut } from 'lucide-react';
import { LanguageProvider, useLanguage } from '@/i18n';
import { CsrfProvider } from '@/hooks/CsrfContext';
import { AuthProvider, useAuth } from '@/auth/AuthContext';
import { EisenhowerMatrix } from './components/EisenhowerMatrix';
import { ThemeToggle } from './components/ThemeToggle';
import { LanguageSelector } from './components/LanguageSelector';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ToastProvider } from './components/ui/toast';
import { Layout } from './components/Layout';
import { LoginPage } from './components/LoginPage';

const ArchivePage = lazy(() =>
  import('./components/ArchivePage').then((m) => ({ default: m.ArchivePage }))
);
const SessionsPage = lazy(() =>
  import('./components/SessionsPage').then((m) => ({ default: m.SessionsPage }))
);

function MatrixPage() {
  const { t } = useLanguage();
  const { user, logout } = useAuth();

  useEffect(() => {
    const preload = () => {
      void import('./components/ArchivePage');
      void import('./components/SessionsPage');
    };
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const idleWindow = window as Window & {
        requestIdleCallback: (cb: () => void) => number;
        cancelIdleCallback?: (handle: number) => void;
      };
      const handle = idleWindow.requestIdleCallback(preload);
      return () => idleWindow.cancelIdleCallback?.(handle);
    }
    const timeoutId = setTimeout(preload, 600);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <Layout>
      <header className="mb-8">
        <div className="mb-2 flex items-center justify-between gap-4">
          <h1 className="min-w-0 truncate text-2xl font-bold text-slate-800 drop-shadow-sm dark:text-white sm:text-3xl md:text-4xl">
            {t.title}
          </h1>
          <div className="flex shrink-0 gap-2">
            <Link
              to="/archive"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/60 bg-white/70 text-slate-600 backdrop-blur-md transition-all duration-200 hover:bg-white/90 hover:text-slate-900 dark:border-slate-700/60 dark:bg-slate-800/70 dark:text-slate-400 dark:hover:bg-slate-800/90 dark:hover:text-slate-200"
              aria-label={t.archive.openArchive}
            >
              <Archive className="h-4 w-4" />
            </Link>
            <Link
              to="/sessions"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/60 bg-white/70 text-slate-600 backdrop-blur-md transition-all duration-200 hover:bg-white/90 hover:text-slate-900 dark:border-slate-700/60 dark:bg-slate-800/70 dark:text-slate-400 dark:hover:bg-slate-800/90 dark:hover:text-slate-200"
              aria-label={t.sessions.openSessions}
              title={t.sessions.openSessions}
            >
              <Shield className="h-4 w-4" />
            </Link>
            <LanguageSelector />
            <ThemeToggle />
            <button
              onClick={() => void logout()}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/60 bg-white/70 text-slate-600 backdrop-blur-md transition-all duration-200 hover:bg-white/90 hover:text-slate-900 dark:border-slate-700/60 dark:bg-slate-800/70 dark:text-slate-400 dark:hover:bg-slate-800/90 dark:hover:text-slate-200"
              aria-label={t.auth.signOut}
              title={t.auth.signOut}
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
        <p className="text-center text-slate-600 dark:text-slate-400">
          {t.subtitle}
        </p>
        <p className="mt-2 text-center text-xs text-slate-500 dark:text-slate-400">
          {t.auth.signedInAs} {user?.email}
        </p>
      </header>
      <EisenhowerMatrix />
    </Layout>
  );
}

function ArchiveSkeleton() {
  return (
    <Layout maxWidth="max-w-4xl">
      <div className="mb-8">
        <div className="mb-4 h-5 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
        <div className="h-9 w-48 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
      </div>
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-20 animate-pulse rounded-xl border border-white/60 bg-white/70 dark:border-slate-700/60 dark:bg-slate-800/70"
          />
        ))}
      </div>
    </Layout>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MatrixPage />} />
      <Route
        path="/archive"
        element={
          <Suspense fallback={<ArchiveSkeleton />}>
            <ArchivePage />
          </Suspense>
        }
      />
      <Route
        path="/sessions"
        element={
          <Suspense fallback={<ArchiveSkeleton />}>
            <SessionsPage />
          </Suspense>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function AuthGate() {
  const { user, loading, authCheckFailed, refresh } = useAuth();
  const { t } = useLanguage();

  if (loading) {
    return (
      <Layout>
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="text-slate-600 dark:text-slate-400">{t.states.loading}</div>
        </div>
      </Layout>
    );
  }

  if (authCheckFailed && !user) {
    return (
      <Layout maxWidth="max-w-xl">
        <div className="mx-auto mt-16 rounded-2xl border border-white/60 bg-white/70 p-8 text-center backdrop-blur-md dark:border-slate-700/60 dark:bg-slate-800/70">
          <h1 className="mb-2 text-2xl font-bold text-slate-800 dark:text-white">
            {t.auth.sessionCheckFailedTitle}
          </h1>
          <p className="mb-6 text-slate-600 dark:text-slate-400">
            {t.auth.sessionCheckFailedDescription}
          </p>
          <button
            onClick={() => void refresh()}
            className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300"
          >
            {t.auth.retrySessionCheck}
          </button>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return <AppRoutes />;
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider>
            <ToastProvider>
              <CsrfProvider>
                <AuthProvider>
                  <AuthGate />
                </AuthProvider>
              </CsrfProvider>
            </ToastProvider>
          </LanguageProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
