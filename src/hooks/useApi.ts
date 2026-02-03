import { useState, useEffect, useCallback } from 'react';
import { Task, QuadrantKey, QuadrantsState } from '@/types';

const API_BASE = '/api';

const INITIAL_STATE: QuadrantsState = {
  urgentImportant: [],
  notUrgentImportant: [],
  urgentNotImportant: [],
  notUrgentNotImportant: [],
};

interface UseApiResult {
  quadrants: QuadrantsState;
  loading: boolean;
  error: string | null;
  addTask: (quadrantKey: QuadrantKey, text: string) => Promise<void>;
  deleteTask: (quadrantKey: QuadrantKey, taskId: string) => Promise<void>;
  editTask: (quadrantKey: QuadrantKey, taskId: string, newText: string) => Promise<void>;
  moveTask: (taskId: string, sourceQuadrant: QuadrantKey, targetQuadrant: QuadrantKey) => Promise<void>;
  refetch: () => Promise<void>;
}

export function useApi(): UseApiResult {
  const [quadrants, setQuadrants] = useState<QuadrantsState>(INITIAL_STATE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      setError(null);
      const response = await fetch(`${API_BASE}/tasks`);
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      setQuadrants(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = useCallback(async (quadrantKey: QuadrantKey, text: string) => {
    try {
      setError(null);
      const response = await fetch(`${API_BASE}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, quadrant: quadrantKey }),
      });

      if (!response.ok) {
        throw new Error('Failed to create task');
      }

      const newTask: Task = await response.json();

      setQuadrants((prev) => ({
        ...prev,
        [quadrantKey]: [...prev[quadrantKey], newTask],
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    }
  }, []);

  const deleteTask = useCallback(async (quadrantKey: QuadrantKey, taskId: string) => {
    try {
      setError(null);
      const response = await fetch(`${API_BASE}/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      setQuadrants((prev) => ({
        ...prev,
        [quadrantKey]: prev[quadrantKey].filter((t) => t.id !== taskId),
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    }
  }, []);

  const editTask = useCallback(async (quadrantKey: QuadrantKey, taskId: string, newText: string) => {
    try {
      setError(null);
      const response = await fetch(`${API_BASE}/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newText }),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      setQuadrants((prev) => ({
        ...prev,
        [quadrantKey]: prev[quadrantKey].map((t) =>
          t.id === taskId ? { ...t, text: newText } : t
        ),
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    }
  }, []);

  const moveTask = useCallback(async (taskId: string, sourceQuadrant: QuadrantKey, targetQuadrant: QuadrantKey) => {
    if (sourceQuadrant === targetQuadrant) return;

    // Optimistic update
    const task = quadrants[sourceQuadrant].find((t) => t.id === taskId);
    if (!task) return;

    setQuadrants((prev) => ({
      ...prev,
      [sourceQuadrant]: prev[sourceQuadrant].filter((t) => t.id !== taskId),
      [targetQuadrant]: [...prev[targetQuadrant], task],
    }));

    try {
      setError(null);
      const response = await fetch(`${API_BASE}/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quadrant: targetQuadrant }),
      });

      if (!response.ok) {
        // Rollback on failure
        setQuadrants((prev) => ({
          ...prev,
          [sourceQuadrant]: [...prev[sourceQuadrant], task],
          [targetQuadrant]: prev[targetQuadrant].filter((t) => t.id !== taskId),
        }));
        throw new Error('Failed to move task');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    }
  }, [quadrants]);

  return {
    quadrants,
    loading,
    error,
    addTask,
    deleteTask,
    editTask,
    moveTask,
    refetch: fetchTasks,
  };
}
