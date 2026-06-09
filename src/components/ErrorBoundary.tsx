import { Component, ReactNode } from 'react';
import * as Sentry from '@sentry/react';
import { en, loadTranslation, type Language, type Translations } from '@/i18n/translations';

const LANGUAGE_STORAGE_KEY = 'eisenhower-language';

function getPersistedLanguage(): Language {
  try {
    const raw = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (raw) {
      const parsed: unknown = JSON.parse(raw);
      if (typeof parsed === 'string') {
        return parsed as Language;
      }
    }
  } catch {
    // Fall back to English below.
  }
  return 'en';
}

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  translations: Translations;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, translations: en };
  }

  static getDerivedStateFromError(): Partial<State> {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    Sentry.captureException(error, { extra: { componentStack: errorInfo.componentStack } });
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    // The boundary is mounted above the LanguageProvider, so resolve the
    // persisted language on its own (unknown languages fall back to English).
    void loadTranslation(getPersistedLanguage()).then((translations) => {
      this.setState({ translations });
    });
  }

  handleRetry = (): void => {
    this.setState({ hasError: false });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const t = this.state.translations;

      return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
          <div className="mx-4 max-w-md rounded-xl border border-red-200 bg-white/80 p-8 text-center shadow-lg backdrop-blur-md dark:border-red-800/50 dark:bg-slate-800/80">
            <div className="mb-4 text-4xl">⚠️</div>
            <h2 className="mb-2 text-xl font-semibold text-slate-800 dark:text-white">
              {t.errorBoundary.title}
            </h2>
            <p className="mb-6 text-slate-600 dark:text-slate-400">
              {t.errorBoundary.description}
            </p>
            <button
              onClick={this.handleRetry}
              className="rounded-lg bg-slate-900 px-6 py-2 text-white transition-colors hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
            >
              {t.errorBoundary.retry}
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
