import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { Archive } from 'lucide-react';
import { LanguageProvider, useLanguage } from '@/i18n';
import { EisenhowerMatrix } from './components/EisenhowerMatrix';
import { ThemeToggle } from './components/ThemeToggle';
import { LanguageSelector } from './components/LanguageSelector';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ToastProvider } from './components/ui/toast';

const ArchivePage = lazy(() =>
  import('./components/ArchivePage').then((m) => ({ default: m.ArchivePage }))
);

function MatrixPage() {
  const { t } = useLanguage();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Decorative blurred shapes */}
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-gradient-to-br from-blue-400/30 to-purple-400/30 blur-3xl dark:from-blue-600/20 dark:to-purple-600/20" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-gradient-to-br from-pink-400/30 to-orange-400/30 blur-3xl dark:from-pink-600/20 dark:to-orange-600/20" />
      <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-indigo-400/20 to-cyan-400/20 blur-3xl dark:from-indigo-600/10 dark:to-cyan-600/10" />

      <div className="relative z-10 p-4 md:p-8">
        <div className="mx-auto max-w-7xl">
          <header className="mb-8">
            <div className="flex items-center justify-between gap-4 mb-2">
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
                <LanguageSelector />
                <ThemeToggle />
              </div>
            </div>
            <p className="text-center text-slate-600 dark:text-slate-400">
              {t.subtitle}
            </p>
          </header>
          <EisenhowerMatrix />
        </div>
      </div>
    </div>
  );
}

function ArchiveSkeleton() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="relative z-10 p-4 md:p-8">
        <div className="mx-auto max-w-4xl">
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
        </div>
      </div>
    </div>
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
    </Routes>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider>
            <ToastProvider>
              <AppRoutes />
            </ToastProvider>
          </LanguageProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
