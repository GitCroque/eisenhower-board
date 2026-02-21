import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useApi, useArchivedTasks } from './useApi';

// Mock fetch to avoid jsdom AbortSignal incompatibility with MSW
const mockFetch = vi.fn();

function mockResponses(overrides: Record<string, (options?: RequestInit) => Response> = {}) {
  mockFetch.mockImplementation(async (url: string, options?: RequestInit) => {
    const key = `${options?.method || 'GET'} ${url}`;
    if (overrides[key]) return overrides[key](options);

    // URL-only fallbacks
    if (overrides[url]) return overrides[url](options);

    if (url === '/api/csrf-token') {
      return new Response(JSON.stringify({ token: 'test-csrf-token' }), { status: 200 });
    }
    if (url === '/api/tasks' && (!options?.method || options.method === 'GET')) {
      return new Response(JSON.stringify({
        urgentImportant: [{ id: '1', text: 'Urgent task', createdAt: 1000 }],
        notUrgentImportant: [],
        urgentNotImportant: [],
        notUrgentNotImportant: [],
      }), { status: 200 });
    }
    if (url === '/api/archived-tasks' && (!options?.method || options.method === 'GET')) {
      return new Response(JSON.stringify([
        { id: 'archived-1', text: 'Archived task', createdAt: 1000, completedAt: 2000, quadrant: 'urgentImportant' },
      ]), { status: 200 });
    }
    return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });
  });
}

beforeEach(() => {
  vi.stubGlobal('fetch', mockFetch);
  mockFetch.mockReset();
  mockResponses();
});

afterEach(() => {
  vi.restoreAllMocks();
});

// Helper: call an async hook method and capture thrown errors
async function callAndCatch(fn: () => Promise<void>): Promise<Error | undefined> {
  let caught: Error | undefined;
  await act(async () => {
    try {
      await fn();
    } catch (e) {
      caught = e as Error;
    }
  });
  return caught;
}

describe('useApi', () => {
  it('fetches tasks on mount', async () => {
    const { result } = renderHook(() => useApi());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeNull();
    expect(result.current.quadrants.urgentImportant).toHaveLength(1);
    expect(result.current.quadrants.urgentImportant[0].text).toBe('Urgent task');
  });

  it('handles fetch error', async () => {
    mockResponses({
      '/api/tasks': () => new Response(JSON.stringify({ error: 'Server error' }), { status: 500 }),
    });

    const { result } = renderHook(() => useApi());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Failed to fetch tasks');
  });

  it('handles network error', async () => {
    mockFetch.mockImplementation(async (url: string) => {
      if (url === '/api/csrf-token') {
        return new Response(JSON.stringify({ token: 'test-csrf-token' }), { status: 200 });
      }
      throw new TypeError('Network error');
    });

    const { result } = renderHook(() => useApi());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Network error');
  });

  it('adds a task', async () => {
    mockResponses({
      'GET /api/tasks': () => new Response(JSON.stringify({
        urgentImportant: [],
        notUrgentImportant: [],
        urgentNotImportant: [],
        notUrgentNotImportant: [],
      }), { status: 200 }),
      'POST /api/tasks': () => new Response(JSON.stringify({ id: 'new-1', text: 'New task', createdAt: 3000 }), { status: 201 }),
    });

    const { result } = renderHook(() => useApi());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.addTask('notUrgentImportant', 'New task');
    });

    expect(result.current.quadrants.notUrgentImportant).toHaveLength(1);
    expect(result.current.quadrants.notUrgentImportant[0].text).toBe('New task');
  });

  it('handles addTask error', async () => {
    mockResponses({
      'POST /api/tasks': () => new Response(JSON.stringify({ error: 'fail' }), { status: 500 }),
    });

    const { result } = renderHook(() => useApi());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const err = await callAndCatch(() => result.current.addTask('urgentImportant', 'fail'));

    expect(err?.message).toBe('Failed to create task');
    expect(result.current.error).toBe('Failed to create task');
  });

  it('deletes a task', async () => {
    mockResponses({
      'DELETE /api/tasks/1': () => new Response(JSON.stringify({ success: true }), { status: 200 }),
    });

    const { result } = renderHook(() => useApi());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.quadrants.urgentImportant).toHaveLength(1);

    await act(async () => {
      await result.current.deleteTask('urgentImportant', '1');
    });

    expect(result.current.quadrants.urgentImportant).toHaveLength(0);
  });

  it('handles deleteTask error', async () => {
    mockResponses({
      'DELETE /api/tasks/1': () => new Response(JSON.stringify({ error: 'fail' }), { status: 500 }),
    });

    const { result } = renderHook(() => useApi());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const err = await callAndCatch(() => result.current.deleteTask('urgentImportant', '1'));

    expect(err?.message).toBe('Failed to delete task');
  });

  it('edits a task', async () => {
    mockResponses({
      'PATCH /api/tasks/1': () => new Response(JSON.stringify({ success: true }), { status: 200 }),
    });

    const { result } = renderHook(() => useApi());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.editTask('urgentImportant', '1', 'Updated text');
    });

    expect(result.current.quadrants.urgentImportant[0].text).toBe('Updated text');
  });

  it('handles editTask error', async () => {
    mockResponses({
      'PATCH /api/tasks/1': () => new Response(JSON.stringify({ error: 'fail' }), { status: 500 }),
    });

    const { result } = renderHook(() => useApi());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const err = await callAndCatch(() => result.current.editTask('urgentImportant', '1', 'fail'));

    expect(err?.message).toBe('Failed to update task');
  });

  it('moves a task optimistically between quadrants', async () => {
    mockResponses({
      'PATCH /api/tasks/1': () => new Response(JSON.stringify({ success: true }), { status: 200 }),
    });

    const { result } = renderHook(() => useApi());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.moveTask('1', 'urgentImportant', 'notUrgentImportant');
    });

    // Optimistic update moves the task to the target quadrant
    expect(result.current.quadrants.urgentImportant).toHaveLength(0);
    expect(result.current.quadrants.notUrgentImportant).toHaveLength(1);
    expect(result.current.quadrants.notUrgentImportant[0].text).toBe('Urgent task');
  });

  it('does nothing when moving to same quadrant', async () => {
    const { result } = renderHook(() => useApi());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.moveTask('1', 'urgentImportant', 'urgentImportant');
    });

    expect(result.current.quadrants.urgentImportant).toHaveLength(1);
  });

  it('completes a task', async () => {
    mockResponses({
      'POST /api/tasks/1/complete': () => new Response(JSON.stringify({ success: true }), { status: 200 }),
    });

    const { result } = renderHook(() => useApi());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.completeTask('urgentImportant', '1');
    });

    expect(result.current.quadrants.urgentImportant).toHaveLength(0);
  });

  it('handles completeTask error', async () => {
    mockResponses({
      'POST /api/tasks/1/complete': () => new Response(JSON.stringify({ error: 'fail' }), { status: 500 }),
    });

    const { result } = renderHook(() => useApi());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const err = await callAndCatch(() =>
      result.current.completeTask('urgentImportant', '1'),
    );

    expect(err?.message).toBe('Failed to complete task');
  });

  it('refetch reloads tasks from server', async () => {
    let callCount = 0;
    mockFetch.mockImplementation(async (url: string, options?: RequestInit) => {
      if (url === '/api/csrf-token') {
        return new Response(JSON.stringify({ token: 'test-csrf-token' }), { status: 200 });
      }
      if (url === '/api/tasks' && (!options?.method || options.method === 'GET')) {
        callCount++;
        return new Response(JSON.stringify({
          urgentImportant: [{ id: '1', text: `Task v${callCount}`, createdAt: 1000 }],
          notUrgentImportant: [],
          urgentNotImportant: [],
          notUrgentNotImportant: [],
        }), { status: 200 });
      }
      return new Response('', { status: 404 });
    });

    const { result } = renderHook(() => useApi());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.quadrants.urgentImportant[0].text).toContain('Task v');

    await act(async () => {
      await result.current.refetch();
    });

    await waitFor(() => {
      expect(callCount).toBeGreaterThanOrEqual(2);
    });
  });
});

describe('useArchivedTasks', () => {
  it('fetches archived tasks on mount', async () => {
    const { result } = renderHook(() => useArchivedTasks());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeNull();
    expect(result.current.archivedTasks).toHaveLength(1);
    expect(result.current.archivedTasks[0].text).toBe('Archived task');
    expect(result.current.archivedTasks[0].quadrant).toBe('urgentImportant');
  });

  it('handles fetch error', async () => {
    mockResponses({
      '/api/archived-tasks': () => new Response(JSON.stringify({ error: 'fail' }), { status: 500 }),
    });

    const { result } = renderHook(() => useArchivedTasks());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Failed to fetch archived tasks');
  });

  it('deletes an archived task', async () => {
    mockResponses({
      'DELETE /api/archived-tasks/archived-1': () => new Response(JSON.stringify({ success: true }), { status: 200 }),
    });

    const { result } = renderHook(() => useArchivedTasks());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.deleteArchivedTask('archived-1');
    });

    expect(result.current.archivedTasks).toHaveLength(0);
  });

  it('handles deleteArchivedTask error', async () => {
    mockResponses({
      'DELETE /api/archived-tasks/archived-1': () => new Response(JSON.stringify({ error: 'fail' }), { status: 500 }),
    });

    const { result } = renderHook(() => useArchivedTasks());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const err = await callAndCatch(() =>
      result.current.deleteArchivedTask('archived-1'),
    );

    expect(err?.message).toBe('Failed to delete archived task');
  });
});
