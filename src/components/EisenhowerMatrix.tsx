import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, pointerWithin } from '@dnd-kit/core';
import { useState, useCallback, useMemo } from 'react';
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

export function EisenhowerMatrix() {
  const { quadrants, loading, error, addTask, deleteTask, completeTask, moveTask } = useApi();
  const { t } = useLanguage();
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const { task } = event.active.data.current as { task: Task };
    setActiveTask(task);
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    setActiveTask(null);
    const { active, over } = event;

    if (!over) return;

    const sourceQuadrant = active.data.current?.sourceQuadrant as QuadrantKey;
    const targetQuadrant = over.id as QuadrantKey;

    if (sourceQuadrant === targetQuadrant) return;

    moveTask(active.id as string, sourceQuadrant, targetQuadrant);
  }, [moveTask]);

  // Stable per-quadrant callbacks to avoid re-creating functions on every render
  const quadrantCallbacks = useMemo(() => {
    const result = {} as Record<QuadrantKey, { onAddTask: (text: string) => void; onDeleteTask: (id: string) => void; onCompleteTask: (id: string) => void }>;
    const keys: QuadrantKey[] = ['urgentImportant', 'notUrgentImportant', 'urgentNotImportant', 'notUrgentNotImportant'];
    for (const key of keys) {
      result[key] = {
        onAddTask: (text: string) => addTask(key, text),
        onDeleteTask: (id: string) => deleteTask(key, id),
        onCompleteTask: (id: string) => completeTask(key, id),
      };
    }
    return result;
  }, [addTask, deleteTask, completeTask]);

  const renderQuadrant = (key: QuadrantKey) => (
    <QuadrantCard
      key={key}
      quadrantKey={key}
      title={t.quadrants[key].title}
      description={t.quadrants[key].description}
      colorClass={QUADRANT_STYLES[key].colorClass}
      iconColor={QUADRANT_STYLES[key].iconColor}
      tasks={quadrants[key]}
      onAddTask={quadrantCallbacks[key].onAddTask}
      onDeleteTask={quadrantCallbacks[key].onDeleteTask}
      onCompleteTask={quadrantCallbacks[key].onCompleteTask}
    />
  );

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
      <div className="w-full max-w-7xl mx-auto">
        {/* Container with left margin for vertical label */}
        <div className="relative md:ml-20">
          {/* Vertical axis labels - Important / Non-important */}
          <div className="hidden md:block absolute -left-20 top-0 bottom-0 w-20">
            {/* IMPORTANT label - top half */}
            <div className="absolute top-1/4 left-0 right-0 flex items-center justify-center">
              <span className="text-slate-700 dark:text-slate-300 tracking-[0.3em] -rotate-90 whitespace-nowrap text-sm font-medium">
                {t.axes.important}
              </span>
            </div>
            {/* NON-IMPORTANT label - bottom half */}
            <div className="absolute top-3/4 left-0 right-0 flex items-center justify-center">
              <span className="text-slate-700 dark:text-slate-300 tracking-[0.3em] -rotate-90 whitespace-nowrap text-sm font-medium">
                {t.axes.notImportant}
              </span>
            </div>
          </div>

          {/* Horizontal axis labels container */}
          <div className="hidden md:flex justify-between mb-6 px-2">
            <div className="w-1/2 flex justify-center">
              <span className="text-slate-700 dark:text-slate-300 tracking-[0.3em] text-sm font-medium">{t.axes.urgent}</span>
            </div>
            <div className="w-1/2 flex justify-center">
              <span className="text-slate-700 dark:text-slate-300 tracking-[0.3em] text-sm font-medium">{t.axes.notUrgent}</span>
            </div>
          </div>

          {/* Grid of quadrants */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderQuadrant('urgentImportant')}
            {renderQuadrant('notUrgentImportant')}
            {renderQuadrant('urgentNotImportant')}
            {renderQuadrant('notUrgentNotImportant')}
          </div>
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
