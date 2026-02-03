import { ThemeProvider } from 'next-themes';
import { LanguageProvider, useLanguage } from '@/i18n';
import { EisenhowerMatrix } from './components/EisenhowerMatrix';
import { ThemeToggle } from './components/ThemeToggle';
import { LanguageSelector } from './components/LanguageSelector';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ToastProvider } from './components/ui/toast';

function AppContent() {
  const { t } = useLanguage();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Decorative blurred shapes */}
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-gradient-to-br from-blue-400/30 to-purple-400/30 blur-3xl dark:from-blue-600/20 dark:to-purple-600/20" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-gradient-to-br from-pink-400/30 to-orange-400/30 blur-3xl dark:from-pink-600/20 dark:to-orange-600/20" />
      <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-indigo-400/20 to-cyan-400/20 blur-3xl dark:from-indigo-600/10 dark:to-cyan-600/10" />

      <div className="relative z-10 flex min-h-screen flex-col p-4 md:p-8">
        <div className="mx-auto max-w-7xl flex-1">
          <header className="relative mb-8">
            <div className="text-center">
              <h1 className="mb-2 text-3xl font-bold text-slate-800 drop-shadow-sm dark:text-white md:text-4xl">
                {t.title}
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                {t.subtitle}
              </p>
            </div>
            <div className="absolute right-0 top-0 flex gap-2">
              <LanguageSelector />
              <ThemeToggle />
            </div>
          </header>
          <EisenhowerMatrix />
        </div>
        <footer className="mt-8 text-center">
          <span className="text-xs text-slate-400/60 dark:text-slate-600/60">
            v{__APP_VERSION__}
          </span>
        </footer>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <LanguageProvider>
          <ToastProvider>
            <AppContent />
          </ToastProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
