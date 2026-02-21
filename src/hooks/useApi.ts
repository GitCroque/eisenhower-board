import { useState, useEffect, useCallback, useRef } from 'react';
import { Task, QuadrantKey, QuadrantsState, ArchivedTask } from '@/types';
import { useCsrfFetch } from './useCsrfFetch';

const API_BASE = '/api';

const tasksChannel = typeof BroadcastChannel !== 'undefined'
  ? new BroadcastChannel('eisenhower-tasks')
  : null;

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
  completeTask: (quadrantKey: QuadrantKey, taskId: string) => Promise<void>;
  refetch: () => Promise<void>;
}

interface UseArchivedTasksResult {
  archivedTasks: ArchivedTask[];
  loading: boolean;
  error: string | null;
  deleteArchivedTask: (taskId: string) => Promise<void>;
  refetch: () => Promise<void>;
}

export function useApi(): UseApiResult {
  const [quadrants, setQuadrants] = useState<QuadrantsState>(INITIAL_STATE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { fetchCsrfToken, fetchWithCsrf } = useCsrfFetch();
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchTasks = useCallback(async () => {
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      setError(null);
      setLoading(true);
      const response = await fetch(`${API_BASE}/tasks`, { signal: controller.signal });
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      setQuadrants(data);
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    Promise.all([fetchCsrfToken(), fetchTasks()]);
    return () => abortControllerRef.current?.abort();
  }, [fetchCsrfToken, fetchTasks]);

  // Sync across tabs via BroadcastChannel
  useEffect(() => {
    if (!tasksChannel) return;
    const handler = () => { void fetchTasks(); };
    tasksChannel.addEventListener('message', handler);
    return () => tasksChannel.removeEventListener('message', handler);
  }, [fetchTasks]);

  const addTask = useCallback(async (quadrantKey: QuadrantKey, text: string) => {
    try {
      setError(null);
      const response = await fetchWithCsrf(`${API_BASE}/tasks`, {
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
      tasksChannel?.postMessage('sync');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    }
  }, [fetchWithCsrf]);

  const deleteTask = useCallback(async (quadrantKey: QuadrantKey, taskId: string) => {
    try {
      setError(null);
      const response = await fetchWithCsrf(`${API_BASE}/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      setQuadrants((prev) => ({
        ...prev,
        [quadrantKey]: prev[quadrantKey].filter((t) => t.id !== taskId),
      }));
      tasksChannel?.postMessage('sync');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    }
  }, [fetchWithCsrf]);

  const editTask = useCallback(async (quadrantKey: QuadrantKey, taskId: string, newText: string) => {
    try {
      setError(null);
      const response = await fetchWithCsrf(`${API_BASE}/tasks/${taskId}`, {
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
      tasksChannel?.postMessage('sync');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    }
  }, [fetchWithCsrf]);

  const moveTask = useCallback(async (taskId: string, sourceQuadrant: QuadrantKey, targetQuadrant: QuadrantKey) => {
    if (sourceQuadrant === targetQuadrant) return;

    // Snapshot for reliable rollback
    const snapshot = { taskId, sourceQuadrant, targetQuadrant };
    let movedTask: Task | undefined;

    setQuadrants((prev) => {
      movedTask = prev[sourceQuadrant].find((t) => t.id === taskId);
      if (!movedTask) return prev;

      return {
        ...prev,
        [sourceQuadrant]: prev[sourceQuadrant].filter((t) => t.id !== taskId),
        [targetQuadrant]: [...prev[targetQuadrant], movedTask],
      };
    });

    if (!movedTask) return;

    try {
      setError(null);
      const response = await fetchWithCsrf(`${API_BASE}/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quadrant: targetQuadrant }),
      });

      if (!response.ok) {
        throw new Error('Failed to move task');
      }
      tasksChannel?.postMessage('sync');
    } catch (err) {
      // Rollback optimistic update on any failure (network error or bad response)
      setQuadrants((prev) => ({
        ...prev,
        [snapshot.sourceQuadrant]: [...prev[snapshot.sourceQuadrant], movedTask!],
        [snapshot.targetQuadrant]: prev[snapshot.targetQuadrant].filter((t) => t.id !== snapshot.taskId),
      }));
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    }
  }, [fetchWithCsrf]);

  const completeTask = useCallback(async (quadrantKey: QuadrantKey, taskId: string) => {
    try {
      setError(null);
      const response = await fetchWithCsrf(`${API_BASE}/tasks/${taskId}/complete`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to complete task');
      }

      setQuadrants((prev) => ({
        ...prev,
        [quadrantKey]: prev[quadrantKey].filter((t) => t.id !== taskId),
      }));
      tasksChannel?.postMessage('sync');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    }
  }, [fetchWithCsrf]);

  return {
    quadrants,
    loading,
    error,
    addTask,
    deleteTask,
    editTask,
    moveTask,
    completeTask,
    refetch: fetchTasks,
  };
}

export function useArchivedTasks(): UseArchivedTasksResult {
  const [archivedTasks, setArchivedTasks] = useState<ArchivedTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { fetchCsrfToken, fetchWithCsrf } = useCsrfFetch();
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchArchivedTasks = useCallback(async () => {
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      setError(null);
      setLoading(true);
      const response = await fetch(`${API_BASE}/archived-tasks`, { signal: controller.signal });
      if (!response.ok) {
        throw new Error('Failed to fetch archived tasks');
      }
      const data = await response.json();
      setArchivedTasks(data);
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    Promise.all([fetchCsrfToken(), fetchArchivedTasks()]);
    return () => abortControllerRef.current?.abort();
  }, [fetchCsrfToken, fetchArchivedTasks]);

  const deleteArchivedTask = useCallback(async (taskId: string) => {
    try {
      setError(null);
      const response = await fetchWithCsrf(`${API_BASE}/archived-tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete archived task');
      }

      setArchivedTasks((prev) => prev.filter((t) => t.id !== taskId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    }
  }, [fetchWithCsrf]);

  return {
    archivedTasks,
    loading,
    error,
    deleteArchivedTask,
    refetch: fetchArchivedTasks,
  };
}
