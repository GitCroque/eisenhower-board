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
import { Layout } from './components/Layout';

const ArchivePage = lazy(() =>
  import('./components/ArchivePage').then((m) => ({ default: m.ArchivePage }))
);

function MatrixPage() {
  const { t } = useLanguage();

  return (
    <Layout>
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
