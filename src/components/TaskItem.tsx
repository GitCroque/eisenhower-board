import { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { X, Check } from 'lucide-react';
import { useLanguage } from '@/i18n';
import { Task } from '@/types';
import { cn } from '@/lib/utils';

interface TaskItemProps {
  task: Task;
  quadrantKey: string;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

export function TaskItem({ task, quadrantKey, onDelete }: TaskItemProps) {
  const [isCompleting, setIsCompleting] = useState(false);
  const { t } = useLanguage();

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
    data: { task, sourceQuadrant: quadrantKey },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const handleComplete = () => {
    setIsCompleting(true);
    setTimeout(() => {
      onDelete(task.id);
    }, 300);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        'group flex items-start justify-between gap-3 rounded-xl border border-white/60 bg-white/70 p-4 backdrop-blur-md transition-all duration-300 cursor-move hover:bg-white/90 hover:shadow-lg hover:shadow-black/5 dark:border-slate-700/60 dark:bg-slate-800/70 dark:hover:bg-slate-800/90',
        isDragging && 'opacity-50 shadow-lg',
        isCompleting && 'scale-95 opacity-0'
      )}
    >
      <p className="flex-1 text-slate-700 dark:text-slate-200">{task.text}</p>
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
        <button
          onClick={handleComplete}
          onPointerDown={(e) => e.stopPropagation()}
          className="text-slate-400 hover:text-green-600 hover:scale-110 transition-all duration-200"
          aria-label={t.tasks.completeTask}
        >
          <Check className="h-4 w-4" />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          onPointerDown={(e) => e.stopPropagation()}
          className="text-slate-400 hover:text-red-600 hover:scale-110 transition-all duration-200"
          aria-label={t.tasks.deleteTask}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
