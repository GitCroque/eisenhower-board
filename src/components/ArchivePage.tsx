import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, RotateCcw, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/i18n';
import { useArchivedTasks } from '@/hooks/useApi';
import { QuadrantKey } from '@/types';
import { cn } from '@/lib/utils';
import { Layout } from './Layout';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';

const quadrantColors: Record<QuadrantKey, string> = {
  urgentImportant: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  notUrgentImportant: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  urgentNotImportant: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  notUrgentNotImportant: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300',
};

const quadrantFilterOptions: Array<QuadrantKey | 'all'> = [
  'all',
  'urgentImportant',
  'notUrgentImportant',
  'urgentNotImportant',
  'notUrgentNotImportant',
];

function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function getInitialPage(searchParams: URLSearchParams): number {
  const parsed = Number(searchParams.get('page'));
  if (!Number.isFinite(parsed) || parsed < 1) {
    return 1;
  }
  return Math.floor(parsed);
}

function getInitialQuadrant(searchParams: URLSearchParams): QuadrantKey | 'all' {
  const raw = searchParams.get('quadrant');
  if (
    raw === 'urgentImportant'
    || raw === 'notUrgentImportant'
    || raw === 'urgentNotImportant'
    || raw === 'notUrgentNotImportant'
  ) {
    return raw;
  }
  return 'all';
}

export function ArchivePage() {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = useMemo(() => getInitialPage(searchParams), [searchParams]);
  const filters = useMemo(() => ({
    q: searchParams.get('q') ?? '',
    quadrant: getInitialQuadrant(searchParams),
    from: searchParams.get('from') ?? '',
    to: searchParams.get('to') ?? '',
  }), [searchParams]);

  const {
    archivedTasks,
    total,
    pageSize,
    loading,
    error,
    deleteArchivedTask,
    restoreArchivedTask,
    refetch,
  } = useArchivedTasks({
    page,
    filters,
  });

  const [deleteTaskId, setDeleteTaskId] = useState<string | null>(null);
  const [jumpPage, setJumpPage] = useState('');
  const [query, setQuery] = useState(filters.q);
  const [fromDate, setFromDate] = useState(filters.from);
  const [toDate, setToDate] = useState(filters.to);
  const [quadrantFilter, setQuadrantFilter] = useState<QuadrantKey | 'all'>(filters.quadrant);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const updateSearch = useCallback((nextPage: number, nextFilters: typeof filters) => {
    const nextParams = new URLSearchParams();
    if (nextPage > 1) {
      nextParams.set('page', String(nextPage));
    }
    if (nextFilters.q) {
      nextParams.set('q', nextFilters.q);
    }
    if (nextFilters.quadrant !== 'all') {
      nextParams.set('quadrant', nextFilters.quadrant);
    }
    if (nextFilters.from) {
      nextParams.set('from', nextFilters.from);
    }
    if (nextFilters.to) {
      nextParams.set('to', nextFilters.to);
    }
    setSearchParams(nextParams, { replace: true });
  }, [setSearchParams]);

  useEffect(() => {
    setQuery(filters.q);
    setFromDate(filters.from);
    setToDate(filters.to);
    setQuadrantFilter(filters.quadrant);
  }, [filters]);

  useEffect(() => {
    if (!loading && page > totalPages) {
      updateSearch(totalPages, filters);
    }
  }, [filters, loading, page, totalPages, updateSearch]);

  const handleDelete = async () => {
    if (!deleteTaskId) return;

    try {
      await deleteArchivedTask(deleteTaskId);
      setDeleteTaskId(null);
    } catch {
      // Keep the dialog open so the user can retry.
    }
  };

  const handleRestore = async (taskId: string) => {
    try {
      await restoreArchivedTask(taskId);
    } catch {
      // Error is surfaced by the hook state.
    }
  };

  const handleApplyFilters = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateSearch(1, {
      q: query.trim(),
      quadrant: quadrantFilter,
      from: fromDate,
      to: toDate,
    });
  };

  const handleJumpToPage = () => {
    const target = Number(jumpPage);
    if (!Number.isFinite(target)) return;
    const normalized = Math.min(totalPages, Math.max(1, Math.floor(target)));
    updateSearch(normalized, filters);
    setJumpPage('');
  };

  if (loading) {
    return (
      <Layout maxWidth="max-w-4xl">
        <div className="flex min-h-[400px] items-center justify-center">
          <p className="text-slate-600 dark:text-slate-400">{t.states.loading}</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout maxWidth="max-w-4xl">
        <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
          <p className="text-red-600 dark:text-red-400">{t.states.error}: {error}</p>
          <button
            onClick={() => void refetch()}
            className="rounded-lg border border-white/60 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 backdrop-blur-md transition-all duration-200 hover:bg-white/90 dark:border-slate-700/60 dark:bg-slate-800/70 dark:text-slate-200 dark:hover:bg-slate-800/90"
          >
            {t.states.retry}
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout maxWidth="max-w-4xl">
      <header className="mb-8">
        <Link
          to="/"
          className="mb-4 inline-flex items-center gap-2 text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
        >
          <ArrowLeft className="h-4 w-4" />
          {t.archive.backToMatrix}
        </Link>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          {t.archive.title}
        </h1>
      </header>

      <form onSubmit={handleApplyFilters} className="mb-5 grid gap-3 rounded-xl border border-white/60 bg-white/70 p-4 backdrop-blur-md dark:border-slate-700/60 dark:bg-slate-800/70 md:grid-cols-4">
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t.archive.searchPlaceholder}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
        />
        <select
          value={quadrantFilter}
          onChange={(event) => setQuadrantFilter(event.target.value as QuadrantKey | 'all')}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
        >
          {quadrantFilterOptions.map((option) => (
            <option key={option} value={option}>
              {option === 'all' ? t.archive.allQuadrants : t.quadrants[option].title}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={fromDate}
          onChange={(event) => setFromDate(event.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
        />
        <div className="flex gap-2">
          <input
            type="date"
            value={toDate}
            onChange={(event) => setToDate(event.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
          />
          <button
            type="submit"
            className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300"
          >
            {t.archive.applyFilters}
          </button>
        </div>
      </form>

      {archivedTasks.length === 0 ? (
        <div className="rounded-xl border border-white/60 bg-white/70 p-8 text-center backdrop-blur-md dark:border-slate-700/60 dark:bg-slate-800/70">
          <p className="text-slate-500 dark:text-slate-400">{t.archive.noTasks}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {archivedTasks.map((task) => (
            <div
              key={task.id}
              className="group flex items-start justify-between gap-4 rounded-xl border border-white/60 bg-white/70 p-4 backdrop-blur-md transition-all duration-300 hover:bg-white/90 hover:shadow-lg hover:shadow-black/5 dark:border-slate-700/60 dark:bg-slate-800/70 dark:hover:bg-slate-800/90"
            >
              <div className="min-w-0 flex-1">
                <p className="mb-2 text-slate-700 dark:text-slate-200">{task.text}</p>
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className={cn('rounded-full px-2 py-0.5 text-xs font-medium', quadrantColors[task.quadrant])}>
                    {t.quadrants[task.quadrant].title}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">
                    {t.archive.completedOn} {formatDate(task.completedAt)}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 opacity-100 transition-all duration-200 md:opacity-0 md:group-hover:opacity-100">
                <button
                  onClick={() => void handleRestore(task.id)}
                  className="rounded-md p-1 text-slate-400 transition-all duration-200 hover:scale-110 hover:text-blue-600"
                  aria-label={t.archive.restoreTask}
                  title={t.archive.restoreTask}
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setDeleteTaskId(task.id)}
                  className="rounded-md p-1 text-slate-400 transition-all duration-200 hover:scale-110 hover:text-red-600"
                  aria-label={t.archive.deleteForever}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => updateSearch(page - 1, filters)}
            disabled={page <= 1}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/60 bg-white/70 text-slate-600 backdrop-blur-md transition-all duration-200 hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700/60 dark:bg-slate-800/70 dark:text-slate-400 dark:hover:bg-slate-800/90"
            aria-label={t.archive.previousPage}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <span className="text-sm text-slate-600 dark:text-slate-400">
            {page} / {totalPages}
          </span>

          <button
            onClick={() => updateSearch(page + 1, filters)}
            disabled={page >= totalPages}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/60 bg-white/70 text-slate-600 backdrop-blur-md transition-all duration-200 hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700/60 dark:bg-slate-800/70 dark:text-slate-400 dark:hover:bg-slate-800/90"
            aria-label={t.archive.nextPage}
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <div className="ml-2 flex items-center gap-2">
            <input
              type="number"
              min={1}
              max={totalPages}
              value={jumpPage}
              onChange={(event) => setJumpPage(event.target.value)}
              placeholder={t.archive.pagePlaceholder}
              className="h-9 w-20 rounded-lg border border-slate-300 bg-white px-2 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
            />
            <button
              onClick={handleJumpToPage}
              className="h-9 rounded-lg border border-white/60 bg-white/70 px-3 text-sm font-medium text-slate-700 backdrop-blur-md transition-all duration-200 hover:bg-white/90 dark:border-slate-700/60 dark:bg-slate-800/70 dark:text-slate-200 dark:hover:bg-slate-800/90"
            >
              {t.archive.goToPage}
            </button>
          </div>
        </div>
      )}

      <AlertDialog open={deleteTaskId !== null} onOpenChange={() => setDeleteTaskId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t.dialogs.deleteConfirmTitle}</AlertDialogTitle>
            <AlertDialogDescription>
              {t.dialogs.deleteConfirmDescription}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t.dialogs.cancel}</AlertDialogCancel>
            <AlertDialogAction onClick={() => void handleDelete()}>
              {t.dialogs.confirm}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
}
