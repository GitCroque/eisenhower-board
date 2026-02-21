import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageProvider } from '@/i18n';
import { ToastProvider } from './ui/toast';
import { EisenhowerMatrix } from './EisenhowerMatrix';

vi.mock('@dnd-kit/core', async () => {
  const actual = await vi.importActual<typeof import('@dnd-kit/core')>('@dnd-kit/core');
  return {
    ...actual,
    useDraggable: () => ({
      attributes: {},
      listeners: {},
      setNodeRef: vi.fn(),
      transform: null,
      isDragging: false,
    }),
    useDroppable: () => ({
      setNodeRef: vi.fn(),
      isOver: false,
    }),
  };
});

// Mock fetch to avoid jsdom AbortSignal incompatibility
const mockFetch = vi.fn();

const defaultTasks = {
  urgentImportant: [{ id: '1', text: 'Urgent task', createdAt: 1000 }],
  notUrgentImportant: [],
  urgentNotImportant: [],
  notUrgentNotImportant: [],
};

beforeEach(() => {
  vi.stubGlobal('fetch', mockFetch);
  mockFetch.mockReset();

  mockFetch.mockImplementation(async (url: string, options?: RequestInit) => {
    if (url === '/api/csrf-token') {
      return new Response(JSON.stringify({ token: 'test-csrf-token' }), { status: 200 });
    }
    if (url === '/api/tasks' && (!options?.method || options.method === 'GET')) {
      return new Response(JSON.stringify(defaultTasks), { status: 200 });
    }
    if (url === '/api/tasks' && options?.method === 'POST') {
      const body = JSON.parse(options.body as string);
      return new Response(JSON.stringify({ id: 'new-1', text: body.text, createdAt: Date.now() }), { status: 201 });
    }
    return new Response('', { status: 404 });
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

function renderMatrix() {
  return render(
    <LanguageProvider>
      <ToastProvider>
        <EisenhowerMatrix />
      </ToastProvider>
    </LanguageProvider>,
  );
}

describe('EisenhowerMatrix', () => {
  it('shows loading state initially', () => {
    renderMatrix();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders four quadrants with tasks', async () => {
    renderMatrix();

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    expect(screen.getByText('Urgent task')).toBeInTheDocument();

    // All four quadrant titles
    expect(screen.getByText('Urgent & Important')).toBeInTheDocument();
    expect(screen.getByText('Important but Not Urgent')).toBeInTheDocument();
    expect(screen.getByText('Urgent but Not Important')).toBeInTheDocument();
    expect(screen.getByText('Neither Urgent nor Important')).toBeInTheDocument();
  });

  it('shows error state and retry button', async () => {
    mockFetch.mockImplementation(async (url: string) => {
      if (url === '/api/csrf-token') {
        return new Response(JSON.stringify({ token: 'test-csrf-token' }), { status: 200 });
      }
      if (url === '/api/tasks') {
        return new Response(JSON.stringify({ error: 'fail' }), { status: 500 });
      }
      return new Response('', { status: 404 });
    });

    renderMatrix();

    await waitFor(() => {
      expect(screen.getByText(/failed to fetch tasks/i)).toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
  });

  it('refetches on retry button click', async () => {
    let callCount = 0;
    mockFetch.mockImplementation(async (url: string) => {
      if (url === '/api/csrf-token') {
        return new Response(JSON.stringify({ token: 'test-csrf-token' }), { status: 200 });
      }
      if (url === '/api/tasks') {
        callCount++;
        if (callCount === 1) {
          return new Response(JSON.stringify({ error: 'fail' }), { status: 500 });
        }
        return new Response(JSON.stringify({
          urgentImportant: [{ id: '1', text: 'Recovered task', createdAt: 1000 }],
          notUrgentImportant: [],
          urgentNotImportant: [],
          notUrgentNotImportant: [],
        }), { status: 200 });
      }
      return new Response('', { status: 404 });
    });

    const user = userEvent.setup();
    renderMatrix();

    await waitFor(() => {
      expect(screen.getByText(/failed to fetch tasks/i)).toBeInTheDocument();
    });

    await user.click(screen.getByRole('button', { name: /retry/i }));

    await waitFor(() => {
      expect(screen.getByText('Recovered task')).toBeInTheDocument();
    });
  });

  it('adds a task via form', async () => {
    const user = userEvent.setup();
    renderMatrix();

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    const addButtons = screen.getAllByRole('button', { name: /add a task/i });
    await user.click(addButtons[0]);

    const input = screen.getByPlaceholderText(/enter/i);
    await user.type(input, 'Brand new task{Enter}');

    await waitFor(() => {
      expect(screen.getByText('Brand new task')).toBeInTheDocument();
    });
  });

  it('shows empty state when no tasks', async () => {
    mockFetch.mockImplementation(async (url: string) => {
      if (url === '/api/csrf-token') {
        return new Response(JSON.stringify({ token: 'test-csrf-token' }), { status: 200 });
      }
      if (url === '/api/tasks') {
        return new Response(JSON.stringify({
          urgentImportant: [],
          notUrgentImportant: [],
          urgentNotImportant: [],
          notUrgentNotImportant: [],
        }), { status: 200 });
      }
      return new Response('', { status: 404 });
    });

    renderMatrix();

    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    // Should show "No tasks" messages (4 quadrants)
    const emptyMessages = screen.getAllByText('No tasks');
    expect(emptyMessages).toHaveLength(4);
  });
});
