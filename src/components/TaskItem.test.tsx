import { describe, it, expect, vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';
import { DndContext } from '@dnd-kit/core';
import { TaskItem } from './TaskItem';
import { LanguageProvider } from '@/i18n';

vi.mock('@dnd-kit/core', () => ({
  DndContext: ({ children }: { children: ReactNode }) => <>{children}</>,
  useDraggable: () => ({
    attributes: {},
    listeners: {},
    setNodeRef: vi.fn(),
    transform: null,
    isDragging: false,
  }),
}));

const mockTask = {
  id: 'test-id-1',
  text: 'Test task text',
  createdAt: Date.now(),
};

function renderTaskItem(
  onDelete = vi.fn(),
  onComplete = vi.fn(),
  onEdit = vi.fn(),
) {
  return render(
    <LanguageProvider>
      <DndContext>
        <TaskItem
          task={mockTask}
          quadrantKey="urgentImportant"
          onDelete={onDelete}
          onComplete={onComplete}
          onEdit={onEdit}
        />
      </DndContext>
    </LanguageProvider>
  );
}

async function click(user: ReturnType<typeof userEvent.setup>, element: HTMLElement) {
  await act(async () => {
    await user.click(element);
  });
}

async function clear(user: ReturnType<typeof userEvent.setup>, element: HTMLElement) {
  await act(async () => {
    await user.clear(element);
  });
}

async function type(user: ReturnType<typeof userEvent.setup>, element: HTMLElement, text: string) {
  await act(async () => {
    await user.type(element, text);
  });
}

describe('TaskItem', () => {
  it('renders task text', () => {
    renderTaskItem();
    expect(screen.getByText('Test task text')).toBeInTheDocument();
  });

  it('shows action buttons including edit', () => {
    renderTaskItem();

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    const completeButton = screen.getByRole('button', { name: /complete/i });
    const editButton = screen.getByRole('button', { name: /edit/i });

    expect(deleteButton).toBeInTheDocument();
    expect(completeButton).toBeInTheDocument();
    expect(editButton).toBeInTheDocument();
  });

  it('opens delete confirmation dialog when delete is clicked', async () => {
    const user = userEvent.setup();
    renderTaskItem();

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    await click(user, deleteButton);

    expect(screen.getByRole('alertdialog')).toBeInTheDocument();
    expect(screen.getByText(/delete task/i)).toBeInTheDocument();
  });

  it('calls onDelete when confirming deletion', async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();
    renderTaskItem(onDelete);

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    await click(user, deleteButton);

    const confirmButton = screen.getByRole('button', { name: /^delete$/i });
    await click(user, confirmButton);

    expect(onDelete).toHaveBeenCalledWith('test-id-1');
  });

  it('closes dialog when cancel is clicked', async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();
    renderTaskItem(onDelete);

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    await click(user, deleteButton);

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await click(user, cancelButton);

    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
    expect(onDelete).not.toHaveBeenCalled();
  });

  it('calls onComplete when complete button is clicked', async () => {
    vi.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const onComplete = vi.fn();
    renderTaskItem(vi.fn(), onComplete);

    const completeButton = screen.getByRole('button', { name: /complete/i });
    await click(user, completeButton);

    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(onComplete).toHaveBeenCalledWith('test-id-1');
    vi.useRealTimers();
  });

  it('enters edit mode when edit button is clicked', async () => {
    const user = userEvent.setup();
    renderTaskItem();

    const editButton = screen.getByRole('button', { name: /edit/i });
    await click(user, editButton);

    const input = screen.getByDisplayValue('Test task text');
    expect(input).toBeInTheDocument();
  });

  it('calls onEdit when pressing Enter in edit mode', async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    renderTaskItem(vi.fn(), vi.fn(), onEdit);

    const editButton = screen.getByRole('button', { name: /edit/i });
    await click(user, editButton);

    const input = screen.getByDisplayValue('Test task text');
    await clear(user, input as HTMLElement);
    await type(user, input as HTMLElement, 'Updated text{Enter}');

    expect(onEdit).toHaveBeenCalledWith('test-id-1', 'Updated text');
  });

  it('cancels edit on Escape', async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    renderTaskItem(vi.fn(), vi.fn(), onEdit);

    const editButton = screen.getByRole('button', { name: /edit/i });
    await click(user, editButton);

    const input = screen.getByDisplayValue('Test task text');
    await clear(user, input as HTMLElement);
    await type(user, input as HTMLElement, 'Something{Escape}');

    expect(onEdit).not.toHaveBeenCalled();
    expect(screen.getByText('Test task text')).toBeInTheDocument();
  });

  it('does not call onEdit when text is unchanged', async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    renderTaskItem(vi.fn(), vi.fn(), onEdit);

    const editButton = screen.getByRole('button', { name: /edit/i });
    await click(user, editButton);

    const input = screen.getByDisplayValue('Test task text');
    await type(user, input as HTMLElement, '{Enter}');

    expect(onEdit).not.toHaveBeenCalled();
  });
});
