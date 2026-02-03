import { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Plus } from 'lucide-react';
import { Task, QuadrantKey, QuadrantConfig } from '@/types';
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
  config: QuadrantConfig;
  tasks: Task[];
  onAddTask: (text: string) => void;
  onDeleteTask: (id: string) => void;
  onEditTask: (id: string, newText: string) => void;
}

export function QuadrantCard({
  quadrantKey,
  config,
  tasks,
  onAddTask,
  onDeleteTask,
  onEditTask,
}: QuadrantCardProps) {
  const [inputValue, setInputValue] = useState('');
  const [isAdding, setIsAdding] = useState(false);

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
        config.colorClass,
        'hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/10',
        isOver && 'scale-[1.02] ring-4 ring-slate-400/50'
      )}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className={cn('h-5 w-5 drop-shadow-sm', config.iconColor)} />
          <span className="text-slate-800 dark:text-slate-100">{config.title}</span>
        </CardTitle>
        <CardDescription>{config.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="max-h-[400px] min-h-[200px] space-y-2 overflow-y-auto">
          {tasks.length === 0 ? (
            <p className="py-8 text-center text-slate-400 dark:text-slate-500">Aucune tâche</p>
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
              placeholder="Entrez une tâche..."
              autoFocus
            />
            <div className="flex gap-2">
              <Button type="submit" size="sm" className="flex-1">
                Ajouter
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => {
                  setIsAdding(false);
                  setInputValue('');
                }}
              >
                Annuler
              </Button>
            </div>
          </form>
        ) : (
          <Button onClick={() => setIsAdding(true)} variant="outline" className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Ajouter une tâche
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
