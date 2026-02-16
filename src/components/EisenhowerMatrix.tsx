import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, pointerWithin } from '@dnd-kit/core';
import { useState, useCallback, useMemo } from 'react';
import { useApi } from '@/hooks/useApi';
import { useLanguage } from '@/i18n';
import { useToast } from './ui/toast';
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
  const { quadrants, loading, error, addTask, deleteTask, editTask, completeTask, moveTask, refetch } = useApi();
  const { t } = useLanguage();
  const { showToast } = useToast();
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

    void moveTask(active.id as string, sourceQuadrant, targetQuadrant)
      .then(() => showToast(t.toasts.taskMoved, 'success'))
      .catch(() => showToast(t.toasts.error, 'error'));
  }, [moveTask, showToast, t.toasts]);

  const handleAddTask = useCallback(async (key: QuadrantKey, text: string) => {
    try {
      await addTask(key, text);
      showToast(t.toasts.taskAdded, 'success');
    } catch (error) {
      showToast(t.toasts.error, 'error');
      throw error;
    }
  }, [addTask, showToast, t.toasts]);

  const handleDeleteTask = useCallback(async (key: QuadrantKey, id: string) => {
    try {
      await deleteTask(key, id);
      showToast(t.toasts.taskDeleted, 'success');
    } catch (error) {
      showToast(t.toasts.error, 'error');
      throw error;
    }
  }, [deleteTask, showToast, t.toasts]);

  const handleCompleteTask = useCallback(async (key: QuadrantKey, id: string) => {
    try {
      await completeTask(key, id);
      showToast(t.toasts.taskCompleted, 'success');
    } catch (error) {
      showToast(t.toasts.error, 'error');
      throw error;
    }
  }, [completeTask, showToast, t.toasts]);

  const handleEditTask = useCallback(async (key: QuadrantKey, id: string, newText: string) => {
    try {
      await editTask(key, id, newText);
    } catch (error) {
      showToast(t.toasts.error, 'error');
      throw error;
    }
  }, [editTask, showToast, t.toasts]);

  // Stable per-quadrant callbacks to avoid re-creating functions on every render
  const quadrantCallbacks = useMemo(() => {
    const result = {} as Record<QuadrantKey, {
      onAddTask: (text: string) => Promise<void>;
      onDeleteTask: (id: string) => Promise<void>;
      onCompleteTask: (id: string) => Promise<void>;
      onEditTask: (id: string, newText: string) => Promise<void>;
    }>;
    const keys: QuadrantKey[] = ['urgentImportant', 'notUrgentImportant', 'urgentNotImportant', 'notUrgentNotImportant'];
    for (const key of keys) {
      result[key] = {
        onAddTask: (text: string) => handleAddTask(key, text),
        onDeleteTask: (id: string) => handleDeleteTask(key, id),
        onCompleteTask: (id: string) => handleCompleteTask(key, id),
        onEditTask: (id: string, newText: string) => handleEditTask(key, id, newText),
      };
    }
    return result;
  }, [handleAddTask, handleDeleteTask, handleCompleteTask, handleEditTask]);

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
      onEditTask={quadrantCallbacks[key].onEditTask}
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
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <div className="text-red-600 dark:text-red-400">{t.states.error}: {error}</div>
        <button
          onClick={() => void refetch()}
          className="rounded-lg border border-white/60 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 backdrop-blur-md transition-all duration-200 hover:bg-white/90 dark:border-slate-700/60 dark:bg-slate-800/70 dark:text-slate-200 dark:hover:bg-slate-800/90"
        >
          {t.states.retry}
        </button>
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
