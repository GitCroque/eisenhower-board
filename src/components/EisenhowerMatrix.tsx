import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, pointerWithin } from '@dnd-kit/core';
import { useState } from 'react';
import { useApi } from '@/hooks/useApi';
import { useLanguage } from '@/i18n';
import { Task, QuadrantKey } from '@/types';
import { QuadrantCard } from './QuadrantCard';

interface QuadrantStyle {
  colorClass: string;
  iconColor: string;
}

const QUADRANT_STYLES: Record<QuadrantKey, QuadrantStyle> = {
  urgentImportant: {
    colorClass: 'bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-900',
    iconColor: 'text-red-600 dark:text-red-400',
  },
  notUrgentImportant: {
    colorClass: 'bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-900',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  urgentNotImportant: {
    colorClass: 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950/30 dark:border-yellow-900',
    iconColor: 'text-amber-600 dark:text-amber-400',
  },
  notUrgentNotImportant: {
    colorClass: 'bg-gray-50 border-gray-200 dark:bg-gray-800/30 dark:border-gray-700',
    iconColor: 'text-slate-600 dark:text-slate-400',
  },
};

const QUADRANT_KEYS: QuadrantKey[] = [
  'urgentImportant',
  'notUrgentImportant',
  'urgentNotImportant',
  'notUrgentNotImportant',
];

export function EisenhowerMatrix() {
  const { quadrants, loading, error, addTask, deleteTask, editTask, moveTask } = useApi();
  const { t } = useLanguage();
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const { task } = event.active.data.current as { task: Task };
    setActiveTask(task);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTask(null);
    const { active, over } = event;

    if (!over) return;

    const sourceQuadrant = active.data.current?.sourceQuadrant as QuadrantKey;
    const targetQuadrant = over.id as QuadrantKey;

    if (sourceQuadrant === targetQuadrant) return;

    moveTask(active.id as string, sourceQuadrant, targetQuadrant);
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-slate-600 dark:text-slate-400">{t.states.loading}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-red-600 dark:text-red-400">{t.states.error}: {error}</div>
      </div>
    );
  }

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      collisionDetection={pointerWithin}
    >
      <div className="space-y-4">
        <div className="relative grid grid-cols-1 gap-4 md:ml-16 md:grid-cols-2">
          {/* Vertical axis label */}
          <div className="absolute -left-16 bottom-0 top-0 hidden items-center justify-center md:flex">
            <span className="-rotate-90 whitespace-nowrap tracking-wider text-slate-700 dark:text-slate-300">
              {t.axes.important}
            </span>
          </div>

          {/* Horizontal axis labels */}
          <div className="absolute -top-8 left-1/4 hidden -translate-x-1/2 md:block">
            <span className="tracking-wider text-slate-700 dark:text-slate-300">{t.axes.urgent}</span>
          </div>
          <div className="absolute -top-8 right-1/4 hidden translate-x-1/2 md:block">
            <span className="tracking-wider text-slate-700 dark:text-slate-300">{t.axes.notUrgent}</span>
          </div>

          {/* Quadrants */}
          {QUADRANT_KEYS.map((key) => (
            <QuadrantCard
              key={key}
              quadrantKey={key}
              title={t.quadrants[key].title}
              description={t.quadrants[key].description}
              colorClass={QUADRANT_STYLES[key].colorClass}
              iconColor={QUADRANT_STYLES[key].iconColor}
              tasks={quadrants[key]}
              onAddTask={(text) => addTask(key, text)}
              onDeleteTask={(id) => deleteTask(key, id)}
              onEditTask={(id, newText) => editTask(key, id, newText)}
            />
          ))}
        </div>
      </div>

      <DragOverlay>
        {activeTask ? (
          <div className="rounded-xl border border-white/60 bg-white/90 p-3 shadow-lg backdrop-blur-md dark:border-slate-700 dark:bg-slate-800/90">
            <p className="text-slate-700 dark:text-slate-200">{activeTask.text}</p>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
