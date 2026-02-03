import { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Pencil, X, Check } from 'lucide-react';
import { useLanguage } from '@/i18n';
import { Task } from '@/types';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';

interface TaskItemProps {
  task: Task;
  quadrantKey: string;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

export function TaskItem({ task, quadrantKey, onDelete, onEdit }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const { t } = useLanguage();

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
    data: { task, sourceQuadrant: quadrantKey },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const handleSubmit = () => {
    if (editText.trim() && editText !== task.text) {
      onEdit(task.id, editText.trim());
    } else {
      setEditText(task.text);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'Escape') {
      setEditText(task.text);
      setIsEditing(false);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'group flex items-center gap-2 rounded-xl border border-white/60 bg-white/70 p-3 backdrop-blur-md transition-all duration-200 hover:bg-white/90 hover:shadow-lg hover:shadow-black/5 dark:border-slate-700/60 dark:bg-slate-800/70 dark:hover:bg-slate-800/90',
        isDragging && 'opacity-50 shadow-lg'
      )}
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab touch-none text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
      >
        <GripVertical className="h-4 w-4" />
      </button>

      {isEditing ? (
        <div className="flex flex-1 items-center gap-2">
          <Input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSubmit}
            autoFocus
            className="h-8 flex-1"
          />
          <button
            onClick={handleSubmit}
            className="text-green-600 hover:text-green-700"
          >
            <Check className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <>
          <p
            className="flex-1 text-slate-700 dark:text-slate-200"
            onDoubleClick={() => setIsEditing(true)}
          >
            {task.text}
          </p>
          <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              onClick={() => setIsEditing(true)}
              className="text-slate-400 transition-colors hover:text-blue-600"
              aria-label={t.tasks.editTask}
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="text-slate-400 transition-colors hover:text-red-600"
              aria-label={t.tasks.deleteTask}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
