import { useState, useEffect, useCallback, useRef } from 'react';
import { Task, QuadrantKey, QuadrantsState, ArchivedTask } from '@/types';
import { useCsrf } from './CsrfContext';

const API_BASE = '/api';

let tasksChannel: BroadcastChannel | null = null;
function getTasksChannel(): BroadcastChannel | null {
  if (tasksChannel) return tasksChannel;
  if (typeof BroadcastChannel !== 'undefined') {
    tasksChannel = new BroadcastChannel('eisenhower-tasks');
  }
  return tasksChannel;
}

const INITIAL_STATE: QuadrantsState = {
  urgentImportant: [],
  notUrgentImportant: [],
  urgentNotImportant: [],
  notUrgentNotImportant: [],
};

function handleUnauthorized(response: Response): void {
  if (response.status === 401) {
    window.location.reload();
    throw new Error('Unauthorized');
  }
}

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
  total: number;
  page: number;
  pageSize: number;
  loading: boolean;
  error: string | null;
  deleteArchivedTask: (taskId: string) => Promise<void>;
  setPage: (page: number) => void;
  refetch: () => Promise<void>;
}

export function useApi(): UseApiResult {
  const [quadrants, setQuadrants] = useState<QuadrantsState>(INITIAL_STATE);
  const quadrantsRef = useRef<QuadrantsState>(INITIAL_STATE);
  // Keep ref in sync
  useEffect(() => { quadrantsRef.current = quadrants; }, [quadrants]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { fetchCsrfToken, fetchWithCsrf } = useCsrf();
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchTasks = useCallback(async () => {
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      setError(null);
      setLoading(true);
      const response = await fetch(`${API_BASE}/tasks`, {
        signal: controller.signal,
        credentials: 'same-origin',
      });
      handleUnauthorized(response);
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
    void Promise.all([fetchCsrfToken(), fetchTasks()]);
    return () => abortControllerRef.current?.abort();
  }, [fetchCsrfToken, fetchTasks]);

  useEffect(() => {
    const channel = getTasksChannel();
    if (!channel) return;
    const handler = () => { void fetchTasks(); };
    channel.addEventListener('message', handler);
    return () => channel.removeEventListener('message', handler);
  }, [fetchTasks]);

  const addTask = useCallback(async (quadrantKey: QuadrantKey, text: string) => {
    try {
      setError(null);
      const response = await fetchWithCsrf(`${API_BASE}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, quadrant: quadrantKey }),
      });

      handleUnauthorized(response);
      if (!response.ok) {
        throw new Error('Failed to create task');
      }

      const newTask: Task = await response.json();

      setQuadrants((prev) => ({
        ...prev,
        [quadrantKey]: [...prev[quadrantKey], newTask],
      }));
      getTasksChannel()?.postMessage('sync');
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

      handleUnauthorized(response);
      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      setQuadrants((prev) => ({
        ...prev,
        [quadrantKey]: prev[quadrantKey].filter((t) => t.id !== taskId),
      }));
      getTasksChannel()?.postMessage('sync');
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

      handleUnauthorized(response);
      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      setQuadrants((prev) => ({
        ...prev,
        [quadrantKey]: prev[quadrantKey].map((t) =>
          t.id === taskId ? { ...t, text: newText } : t
        ),
      }));
      getTasksChannel()?.postMessage('sync');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    }
  }, [fetchWithCsrf]);

  const moveTask = useCallback(async (taskId: string, sourceQuadrant: QuadrantKey, targetQuadrant: QuadrantKey) => {
    if (sourceQuadrant === targetQuadrant) return;

    const currentQuadrants = quadrantsRef.current;
    const movedTask = currentQuadrants[sourceQuadrant].find((t) => t.id === taskId);
    if (!movedTask) return;

    setQuadrants((prev) => ({
      ...prev,
      [sourceQuadrant]: prev[sourceQuadrant].filter((t) => t.id !== taskId),
      [targetQuadrant]: [...prev[targetQuadrant], movedTask],
    }));

    try {
      setError(null);
      const response = await fetchWithCsrf(`${API_BASE}/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quadrant: targetQuadrant }),
      });

      handleUnauthorized(response);
      if (!response.ok) {
        throw new Error('Failed to move task');
      }
      getTasksChannel()?.postMessage('sync');
    } catch (err) {
      // Rollback optimistic update
      setQuadrants((prev) => ({
        ...prev,
        [sourceQuadrant]: [...prev[sourceQuadrant], movedTask],
        [targetQuadrant]: prev[targetQuadrant].filter((t) => t.id !== taskId),
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

      handleUnauthorized(response);
      if (!response.ok) {
        throw new Error('Failed to complete task');
      }

      setQuadrants((prev) => ({
        ...prev,
        [quadrantKey]: prev[quadrantKey].filter((t) => t.id !== taskId),
      }));
      getTasksChannel()?.postMessage('sync');
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

const DEFAULT_PAGE_SIZE = 20;

export function useArchivedTasks(): UseArchivedTasksResult {
  const [archivedTasks, setArchivedTasks] = useState<ArchivedTask[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPageState] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { fetchCsrfToken, fetchWithCsrf } = useCsrf();
  const abortControllerRef = useRef<AbortController | null>(null);
  const pageRef = useRef(1);

  const fetchArchivedTasks = useCallback(async (targetPage?: number) => {
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;
    const p = targetPage ?? pageRef.current;

    try {
      setError(null);
      setLoading(true);
      const response = await fetch(
        `${API_BASE}/archived-tasks?page=${p}&pageSize=${DEFAULT_PAGE_SIZE}`,
        { signal: controller.signal, credentials: 'same-origin' },
      );
      handleUnauthorized(response);
      if (!response.ok) {
        throw new Error('Failed to fetch archived tasks');
      }
      const data = await response.json();
      setArchivedTasks(data.tasks);
      setTotal(data.total);
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void Promise.all([fetchCsrfToken(), fetchArchivedTasks()]);
    return () => abortControllerRef.current?.abort();
  }, [fetchCsrfToken, fetchArchivedTasks]);

  const setPage = useCallback((newPage: number) => {
    pageRef.current = newPage;
    setPageState(newPage);
    void fetchArchivedTasks(newPage);
  }, [fetchArchivedTasks]);

  const deleteArchivedTask = useCallback(async (taskId: string) => {
    try {
      setError(null);
      const response = await fetchWithCsrf(`${API_BASE}/archived-tasks/${taskId}`, {
        method: 'DELETE',
      });

      handleUnauthorized(response);
      if (!response.ok) {
        throw new Error('Failed to delete archived task');
      }

      setArchivedTasks((prev) => prev.filter((t) => t.id !== taskId));
      setTotal((prev) => prev - 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    }
  }, [fetchWithCsrf]);

  return {
    archivedTasks,
    total,
    page,
    pageSize: DEFAULT_PAGE_SIZE,
    loading,
    error,
    deleteArchivedTask,
    setPage,
    refetch: fetchArchivedTasks,
  };
}
