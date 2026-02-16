import { Component, ReactNode } from 'react';
import { translations, Language } from '@/i18n/translations';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

function getStoredLanguage(): Language {
  try {
    const stored = localStorage.getItem('eisenhower-language');
    if (stored) {
      const parsed = JSON.parse(stored) as string;
      if (parsed in translations) return parsed as Language;
    }
  } catch {
    // ignore
  }
  const browserLang = navigator.language.split('-')[0] as Language;
  return browserLang in translations ? browserLang : 'en';
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const t = translations[getStoredLanguage()];

      return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
          <div className="mx-4 max-w-md rounded-xl border border-red-200 bg-white/80 p-8 text-center shadow-lg backdrop-blur-md dark:border-red-800/50 dark:bg-slate-800/80">
            <div className="mb-4 text-4xl">⚠️</div>
            <h2 className="mb-2 text-xl font-semibold text-slate-800 dark:text-white">
              {t.errorBoundary.title}
            </h2>
            <p className="mb-6 text-slate-600 dark:text-slate-400">
              {this.state.error?.message || t.errorBoundary.description}
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
