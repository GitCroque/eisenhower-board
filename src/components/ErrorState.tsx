import { useLanguage } from '@/i18n';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  const { t } = useLanguage();

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
      <p className="text-red-600 dark:text-red-400">{t.states.error}: {message}</p>
      <button
        onClick={onRetry}
        className="rounded-lg border border-white/60 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 backdrop-blur-md transition-all duration-200 hover:bg-white/90 dark:border-slate-700/60 dark:bg-slate-800/70 dark:text-slate-200 dark:hover:bg-slate-800/90"
      >
        {t.states.retry}
      </button>
    </div>
  );
}
