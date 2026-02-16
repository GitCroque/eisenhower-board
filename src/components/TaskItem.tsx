import { memo, useState, useRef, useEffect } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { X, Check, Pencil } from 'lucide-react';
import { useLanguage } from '@/i18n';
import { Task } from '@/types';
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

interface TaskItemProps {
  task: Task;
  quadrantKey: string;
  onDelete: (id: string) => Promise<void> | void;
  onComplete: (id: string) => Promise<void> | void;
  onEdit: (id: string, newText: string) => Promise<void> | void;
}

export const TaskItem = memo(function TaskItem({ task, quadrantKey, onDelete, onComplete, onEdit }: TaskItemProps) {
  const [isCompleting, setIsCompleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const editInputRef = useRef<HTMLInputElement>(null);
  const completeTimeoutRef = useRef<number | null>(null);
  const isSubmittingEditRef = useRef(false);
  const { t } = useLanguage();

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
    data: { task, sourceQuadrant: quadrantKey },
    disabled: isEditing,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [isEditing]);

  useEffect(() => {
    return () => {
      if (completeTimeoutRef.current !== null) {
        window.clearTimeout(completeTimeoutRef.current);
      }
    };
  }, []);

  const handleComplete = () => {
    setIsCompleting(true);
    completeTimeoutRef.current = window.setTimeout(() => {
      completeTimeoutRef.current = null;
      void Promise.resolve(onComplete(task.id)).catch(() => {
        setIsCompleting(false);
      });
    }, 300);
  };

  const handleDelete = () => {
    setShowDeleteConfirm(false);
    void Promise.resolve(onDelete(task.id)).catch(() => {
      // Error already handled upstream (toast shown)
    });
  };

  const handleEditSubmit = async () => {
    if (isSubmittingEditRef.current) return;
    isSubmittingEditRef.current = true;
    const trimmed = editText.trim();
    try {
      if (trimmed && trimmed !== task.text) {
        await Promise.resolve(onEdit(task.id, trimmed));
      }
      setIsEditing(false);
    } catch {
      // Keep edit mode open on failure so the user can retry.
    } finally {
      window.setTimeout(() => {
        isSubmittingEditRef.current = false;
      }, 0);
    }
  };

  const handleEditCancel = () => {
    isSubmittingEditRef.current = false;
    setEditText(task.text);
    setIsEditing(false);
  };

  const handleEditKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      void handleEditSubmit();
    } else if (e.key === 'Escape') {
      handleEditCancel();
    }
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...(isEditing ? {} : { ...attributes, ...listeners })}
        className={cn(
          'group flex items-start justify-between gap-3 rounded-xl border border-white/60 bg-white/70 p-4 backdrop-blur-md transition-all duration-300 hover:bg-white/90 hover:shadow-lg hover:shadow-black/5 dark:border-slate-700/60 dark:bg-slate-800/70 dark:hover:bg-slate-800/90',
          !isEditing && 'cursor-move',
          isDragging && 'opacity-50 shadow-lg',
          isCompleting && 'scale-95 opacity-0'
        )}
      >
        {isEditing ? (
          <input
            ref={editInputRef}
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={() => void handleEditSubmit()}
            onKeyDown={handleEditKeyDown}
            className="flex-1 rounded-lg border border-slate-300 bg-white px-2 py-1 text-slate-700 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
            maxLength={500}
          />
        ) : (
          <p className="flex-1 text-slate-700 dark:text-slate-200">{task.text}</p>
        )}
        {!isEditing && (
          <div className="flex items-center gap-2 opacity-100 transition-all duration-200 md:opacity-0 md:group-hover:opacity-100">
            <button
              onClick={handleComplete}
              onPointerDown={(e) => e.stopPropagation()}
              className="text-slate-400 hover:text-green-600 hover:scale-110 transition-all duration-200"
              aria-label={t.tasks.completeTask}
            >
              <Check className="h-4 w-4" />
            </button>
            <button
              onClick={() => {
                setEditText(task.text);
                setIsEditing(true);
              }}
              onPointerDown={(e) => e.stopPropagation()}
              className="text-slate-400 hover:text-blue-600 hover:scale-110 transition-all duration-200"
              aria-label={t.tasks.editTask}
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              onPointerDown={(e) => e.stopPropagation()}
              className="text-slate-400 hover:text-red-600 hover:scale-110 transition-all duration-200"
              aria-label={t.tasks.deleteTask}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
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
    </>
  );
});
