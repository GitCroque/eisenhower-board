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

const DEFAULT_PAGE_SIZE = 20;
const MOVE_BATCH_DELAY_MS = 250;
const CHANNEL_DEBOUNCE_MS = 150;

function handleUnauthorized(response: Response): void {
  if (response.status === 401) {
    window.location.reload();
    throw new Error('Unauthorized');
  }
}

function parseDateToTimestamp(value: string, endOfDay = false): number | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  if (endOfDay) {
    date.setHours(23, 59, 59, 999);
  } else {
    date.setHours(0, 0, 0, 0);
  }
  return date.getTime();
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

export interface ArchivedFiltersState {
  q: string;
  quadrant: QuadrantKey | 'all';
  from: string;
  to: string;
}

interface UseArchivedTasksOptions {
  page: number;
  filters: ArchivedFiltersState;
}

interface UseArchivedTasksResult {
  archivedTasks: ArchivedTask[];
  total: number;
  pageSize: number;
  loading: boolean;
  error: string | null;
  deleteArchivedTask: (taskId: string) => Promise<void>;
  restoreArchivedTask: (taskId: string) => Promise<void>;
  refetch: () => Promise<void>;
}

interface MoveBatchOperation {
  id: string;
  quadrant: QuadrantKey;
}

interface DeferredOperation {
  resolve: () => void;
  reject: (error: Error) => void;
}

export function useApi(): UseApiResult {
  const [quadrants, setQuadrants] = useState<QuadrantsState>(INITIAL_STATE);
  const quadrantsRef = useRef<QuadrantsState>(INITIAL_STATE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { fetchCsrfToken, fetchWithCsrf } = useCsrf();
  const abortControllerRef = useRef<AbortController | null>(null);
  const tasksEtagRef = useRef<string | null>(null);
  const moveBatchTimerRef = useRef<number | null>(null);
  const pendingMovesRef = useRef<Map<string, MoveBatchOperation>>(new Map());
  const pendingMovePromisesRef = useRef<DeferredOperation[]>([]);
  const broadcastTimerRef = useRef<number | null>(null);
  const fetchDebounceTimerRef = useRef<number | null>(null);

  useEffect(() => {
    quadrantsRef.current = quadrants;
  }, [quadrants]);

  const broadcastTasksChange = useCallback(() => {
    if (broadcastTimerRef.current !== null) {
      return;
    }
    broadcastTimerRef.current = window.setTimeout(() => {
      broadcastTimerRef.current = null;
      getTasksChannel()?.postMessage('sync');
    }, CHANNEL_DEBOUNCE_MS);
  }, []);

  const fetchTasks = useCallback(async () => {
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      setError(null);
      setLoading(true);

      const headers: HeadersInit = {};
      if (tasksEtagRef.current) {
        headers['If-None-Match'] = tasksEtagRef.current;
      }

      const response = await fetch(`${API_BASE}/tasks`, {
        signal: controller.signal,
        credentials: 'same-origin',
        headers,
      });

      handleUnauthorized(response);
      if (response.status === 304) {
        return;
      }
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }

      const etag = response.headers.get('ETag');
      if (etag) {
        tasksEtagRef.current = etag;
      }

      const data = await response.json() as QuadrantsState;
      setQuadrants(data);
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  const flushMoveBatch = useCallback(async () => {
    if (pendingMovesRef.current.size === 0) {
      return;
    }

    const operations = Array.from(pendingMovesRef.current.values()).map((op) => ({
      type: 'move' as const,
      id: op.id,
      quadrant: op.quadrant,
    }));

    pendingMovesRef.current.clear();
    const deferred = pendingMovePromisesRef.current.splice(0, pendingMovePromisesRef.current.length);

    try {
      setError(null);
      const response = await fetchWithCsrf(`${API_BASE}/tasks/batch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ operations }),
      });

      handleUnauthorized(response);
      if (!response.ok) {
        throw new Error('Failed to move task');
      }

      broadcastTasksChange();
      deferred.forEach(({ resolve }) => resolve());
    } catch (err) {
      const errorToThrow = err instanceof Error ? err : new Error('Failed to move task');
      setError(errorToThrow.message);
      await fetchTasks();
      deferred.forEach(({ reject }) => reject(errorToThrow));
    }
  }, [broadcastTasksChange, fetchTasks, fetchWithCsrf]);

  useEffect(() => {
    void Promise.all([fetchCsrfToken(), fetchTasks()]);

    return () => {
      abortControllerRef.current?.abort();
      if (moveBatchTimerRef.current !== null) {
        window.clearTimeout(moveBatchTimerRef.current);
      }
      if (broadcastTimerRef.current !== null) {
        window.clearTimeout(broadcastTimerRef.current);
      }
      if (fetchDebounceTimerRef.current !== null) {
        window.clearTimeout(fetchDebounceTimerRef.current);
      }
      const cancellationError = new Error('Pending task move operation cancelled');
      pendingMovePromisesRef.current.forEach(({ reject }) => reject(cancellationError));
      pendingMovePromisesRef.current = [];
      pendingMovesRef.current.clear();
    };
  }, [fetchCsrfToken, fetchTasks]);

  useEffect(() => {
    const channel = getTasksChannel();
    if (!channel) return;

    const handler = () => {
      if (fetchDebounceTimerRef.current !== null) {
        return;
      }
      fetchDebounceTimerRef.current = window.setTimeout(() => {
        fetchDebounceTimerRef.current = null;
        void fetchTasks();
      }, CHANNEL_DEBOUNCE_MS);
    };

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

      const newTask: Task = await response.json() as Task;
      tasksEtagRef.current = null;

      setQuadrants((prev) => ({
        ...prev,
        [quadrantKey]: [...prev[quadrantKey], newTask],
      }));

      broadcastTasksChange();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    }
  }, [broadcastTasksChange, fetchWithCsrf]);

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

      tasksEtagRef.current = null;
      setQuadrants((prev) => ({
        ...prev,
        [quadrantKey]: prev[quadrantKey].filter((t) => t.id !== taskId),
      }));
      broadcastTasksChange();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    }
  }, [broadcastTasksChange, fetchWithCsrf]);

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

      tasksEtagRef.current = null;
      setQuadrants((prev) => ({
        ...prev,
        [quadrantKey]: prev[quadrantKey].map((t) =>
          t.id === taskId ? { ...t, text: newText } : t,
        ),
      }));
      broadcastTasksChange();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    }
  }, [broadcastTasksChange, fetchWithCsrf]);

  const moveTask = useCallback(async (taskId: string, sourceQuadrant: QuadrantKey, targetQuadrant: QuadrantKey) => {
    if (sourceQuadrant === targetQuadrant) return;

    const currentQuadrants = quadrantsRef.current;
    const movedTask = currentQuadrants[sourceQuadrant].find((t) => t.id === taskId);
    if (!movedTask) return;

    tasksEtagRef.current = null;
    setQuadrants((prev) => ({
      ...prev,
      [sourceQuadrant]: prev[sourceQuadrant].filter((t) => t.id !== taskId),
      [targetQuadrant]: [...prev[targetQuadrant], movedTask],
    }));

    pendingMovesRef.current.set(taskId, {
      id: taskId,
      quadrant: targetQuadrant,
    });

    if (moveBatchTimerRef.current !== null) {
      window.clearTimeout(moveBatchTimerRef.current);
    }

    moveBatchTimerRef.current = window.setTimeout(() => {
      moveBatchTimerRef.current = null;
      void flushMoveBatch();
    }, MOVE_BATCH_DELAY_MS);

    return new Promise<void>((resolve, reject) => {
      pendingMovePromisesRef.current.push({ resolve, reject });
    });
  }, [flushMoveBatch]);

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

      tasksEtagRef.current = null;
      setQuadrants((prev) => ({
        ...prev,
        [quadrantKey]: prev[quadrantKey].filter((t) => t.id !== taskId),
      }));
      broadcastTasksChange();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    }
  }, [broadcastTasksChange, fetchWithCsrf]);

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

export function useArchivedTasks(options: UseArchivedTasksOptions): UseArchivedTasksResult {
  const [archivedTasks, setArchivedTasks] = useState<ArchivedTask[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const page = Math.max(1, options.page);
  const filters = options.filters;

  const { fetchCsrfToken, fetchWithCsrf } = useCsrf();
  const abortControllerRef = useRef<AbortController | null>(null);
  const archivedEtagRef = useRef<string | null>(null);
  const archivedQueryRef = useRef<string | null>(null);

  const fetchArchivedTasks = useCallback(async (targetPage?: number, targetFilters?: ArchivedFiltersState) => {
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    const currentPage = targetPage ?? page;
    const currentFilters = targetFilters ?? filters;

    const params = new URLSearchParams({
      page: String(currentPage),
      pageSize: String(DEFAULT_PAGE_SIZE),
    });

    if (currentFilters.q.trim()) {
      params.set('q', currentFilters.q.trim());
    }
    if (currentFilters.quadrant !== 'all') {
      params.set('quadrant', currentFilters.quadrant);
    }

    const fromTs = parseDateToTimestamp(currentFilters.from);
    if (fromTs !== undefined) {
      params.set('from', String(fromTs));
    }

    const toTs = parseDateToTimestamp(currentFilters.to, true);
    if (toTs !== undefined) {
      params.set('to', String(toTs));
    }

    try {
      setError(null);
      setLoading(true);

      const headers: HeadersInit = {};
      const queryKey = params.toString();
      if (archivedEtagRef.current && archivedQueryRef.current === queryKey) {
        headers['If-None-Match'] = archivedEtagRef.current;
      }

      const response = await fetch(
        `${API_BASE}/archived-tasks?${queryKey}`,
        { signal: controller.signal, credentials: 'same-origin', headers },
      );

      handleUnauthorized(response);
      if (response.status === 304) {
        return;
      }
      if (!response.ok) {
        throw new Error('Failed to fetch archived tasks');
      }

      const etag = response.headers.get('ETag');
      if (etag) {
        archivedEtagRef.current = etag;
        archivedQueryRef.current = queryKey;
      }

      const data = await response.json() as {
        tasks: ArchivedTask[];
        total: number;
      };
      setArchivedTasks(data.tasks);
      setTotal(data.total);
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [filters.from, filters.q, filters.quadrant, filters.to, page]);

  useEffect(() => {
    archivedEtagRef.current = null;
    archivedQueryRef.current = null;
    void Promise.all([fetchCsrfToken(), fetchArchivedTasks(page, filters)]);
    return () => abortControllerRef.current?.abort();
  }, [fetchCsrfToken, fetchArchivedTasks, filters.from, filters.q, filters.quadrant, filters.to, page]);

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

      archivedEtagRef.current = null;
      archivedQueryRef.current = null;
      setArchivedTasks((prev) => prev.filter((t) => t.id !== taskId));
      setTotal((prev) => Math.max(0, prev - 1));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    }
  }, [fetchWithCsrf]);

  const restoreArchivedTask = useCallback(async (taskId: string) => {
    try {
      setError(null);
      const response = await fetchWithCsrf(`${API_BASE}/archived-tasks/${taskId}/restore`, {
        method: 'POST',
      });

      handleUnauthorized(response);
      if (!response.ok) {
        throw new Error('Failed to restore archived task');
      }

      archivedEtagRef.current = null;
      archivedQueryRef.current = null;
      setArchivedTasks((prev) => prev.filter((t) => t.id !== taskId));
      setTotal((prev) => Math.max(0, prev - 1));
      getTasksChannel()?.postMessage('sync');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    }
  }, [fetchWithCsrf]);

  return {
    archivedTasks,
    total,
    pageSize: DEFAULT_PAGE_SIZE,
    loading,
    error,
    deleteArchivedTask,
    restoreArchivedTask,
    refetch: fetchArchivedTasks,
  };
}
