import { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Plus } from 'lucide-react';
import { useLanguage } from '@/i18n';
import { Task, QuadrantKey } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { TaskItem } from './TaskItem';
import { cn } from '@/lib/utils';
import { AlertCircle, Calendar, Clock, Trash2 } from 'lucide-react';

const QUADRANT_ICONS = {
  urgentImportant: AlertCircle,
  notUrgentImportant: Calendar,
  urgentNotImportant: Clock,
  notUrgentNotImportant: Trash2,
} as const;

interface QuadrantCardProps {
  quadrantKey: QuadrantKey;
  title: string;
  description: string;
  colorClass: string;
  iconColor: string;
  tasks: Task[];
  onAddTask: (text: string) => void;
  onDeleteTask: (id: string) => void;
  onEditTask: (id: string, newText: string) => void;
}

export function QuadrantCard({
  quadrantKey,
  title,
  description,
  colorClass,
  iconColor,
  tasks,
  onAddTask,
  onDeleteTask,
  onEditTask,
}: QuadrantCardProps) {
  const [inputValue, setInputValue] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const { t } = useLanguage();

  const { setNodeRef, isOver } = useDroppable({
    id: quadrantKey,
  });

  const Icon = QUADRANT_ICONS[quadrantKey];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAddTask(inputValue.trim());
      setInputValue('');
      setIsAdding(false);
    }
  };

  return (
    <Card
      ref={setNodeRef}
      className={cn(
        colorClass,
        'hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/10',
        isOver && 'scale-[1.02] ring-4 ring-slate-400/50'
      )}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className={cn('h-5 w-5 drop-shadow-sm', iconColor)} />
          <span className="text-slate-800 dark:text-slate-100">{title}</span>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="max-h-[400px] min-h-[200px] space-y-2 overflow-y-auto">
          {tasks.length === 0 ? (
            <p className="py-8 text-center text-slate-400 dark:text-slate-500">{t.tasks.noTasks}</p>
          ) : (
            tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                quadrantKey={quadrantKey}
                onDelete={onDeleteTask}
                onEdit={onEditTask}
              />
            ))
          )}
        </div>

        {isAdding ? (
          <form onSubmit={handleSubmit} className="space-y-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t.tasks.enterTask}
              autoFocus
              className="border-white/60 bg-white/80 backdrop-blur-md transition-all duration-200 focus:bg-white/95 dark:border-slate-700/60 dark:bg-slate-800/80 dark:focus:bg-slate-800/95"
            />
            <div className="flex gap-2">
              <Button
                type="submit"
                size="sm"
                className="flex-1 border border-white/20 bg-slate-900/80 shadow-lg backdrop-blur-md transition-all duration-200 hover:bg-slate-900 dark:bg-white/80 dark:text-slate-900 dark:hover:bg-white/90"
              >
                {t.tasks.add}
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => {
                  setIsAdding(false);
                  setInputValue('');
                }}
                className="border-white/60 bg-white/70 backdrop-blur-md transition-all duration-200 hover:bg-white/90 dark:border-slate-700/60 dark:bg-slate-800/70 dark:hover:bg-slate-800/90"
              >
                {t.tasks.cancel}
              </Button>
            </div>
          </form>
        ) : (
          <Button
            onClick={() => setIsAdding(true)}
            variant="outline"
            className="w-full border-white/60 bg-white/70 backdrop-blur-md transition-all duration-200 hover:bg-white/90 hover:shadow-lg hover:shadow-black/5 dark:border-slate-700/60 dark:bg-slate-800/70 dark:hover:bg-slate-800/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            {t.tasks.addTask}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
