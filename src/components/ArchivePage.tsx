import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { useLanguage } from '@/i18n';
import { useArchivedTasks } from '@/hooks/useApi';
import { QuadrantKey } from '@/types';
import { cn } from '@/lib/utils';
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

export function ArchivePage() {
  const { t } = useLanguage();
  const { archivedTasks, loading, error, deleteArchivedTask } = useArchivedTasks();
  const [deleteTaskId, setDeleteTaskId] = useState<string | null>(null);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleDelete = async () => {
    if (deleteTaskId) {
      try {
        await deleteArchivedTask(deleteTaskId);
        setDeleteTaskId(null);
      } catch {
        // Keep the dialog open so the user can retry.
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-slate-600 dark:text-slate-400">{t.states.loading}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600 dark:text-red-400">{t.states.error}: {error}</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Decorative blurred shapes */}
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-gradient-to-br from-blue-400/30 to-purple-400/30 blur-3xl dark:from-blue-600/20 dark:to-purple-600/20" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-gradient-to-br from-pink-400/30 to-orange-400/30 blur-3xl dark:from-pink-600/20 dark:to-orange-600/20" />

      <div className="relative z-10 p-4 md:p-8">
        <div className="mx-auto max-w-4xl">
          <header className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              {t.archive.backToMatrix}
            </Link>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
              {t.archive.title}
            </h1>
          </header>

          {archivedTasks.length === 0 ? (
            <div className="rounded-xl border border-white/60 bg-white/70 p-8 backdrop-blur-md dark:border-slate-700/60 dark:bg-slate-800/70 text-center">
              <p className="text-slate-500 dark:text-slate-400">{t.archive.noTasks}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {archivedTasks.map((task) => (
                <div
                  key={task.id}
                  className="group flex items-start justify-between gap-4 rounded-xl border border-white/60 bg-white/70 p-4 backdrop-blur-md transition-all duration-300 hover:bg-white/90 hover:shadow-lg hover:shadow-black/5 dark:border-slate-700/60 dark:bg-slate-800/70 dark:hover:bg-slate-800/90"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-700 dark:text-slate-200 mb-2">{task.text}</p>
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                      <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium', quadrantColors[task.quadrant])}>
                        {t.quadrants[task.quadrant].title}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400">
                        {t.archive.completedOn} {formatDate(task.completedAt)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setDeleteTaskId(task.id)}
                    className="text-slate-400 hover:text-red-600 hover:scale-110 transition-all duration-200 opacity-100 md:opacity-0 md:group-hover:opacity-100"
                    aria-label={t.archive.deleteForever}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

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
            <AlertDialogAction onClick={handleDelete}>
              {t.dialogs.confirm}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
