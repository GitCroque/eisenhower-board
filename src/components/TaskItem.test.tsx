import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DndContext } from '@dnd-kit/core';
import { TaskItem } from './TaskItem';
import { LanguageProvider } from '@/i18n';

const mockTask = {
  id: 'test-id-1',
  text: 'Test task text',
  createdAt: Date.now(),
};

function renderTaskItem(onDelete = vi.fn()) {
  return render(
    <LanguageProvider>
      <DndContext>
        <TaskItem
          task={mockTask}
          quadrantKey="urgentImportant"
          onDelete={onDelete}
        />
      </DndContext>
    </LanguageProvider>
  );
}

describe('TaskItem', () => {
  it('renders task text', () => {
    renderTaskItem();
    expect(screen.getByText('Test task text')).toBeInTheDocument();
  });

  it('shows action buttons on hover', () => {
    renderTaskItem();

    // Buttons should exist but be invisible initially (opacity-0)
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    const completeButton = screen.getByRole('button', { name: /complete/i });

    expect(deleteButton).toBeInTheDocument();
    expect(completeButton).toBeInTheDocument();
  });

  it('opens delete confirmation dialog when delete is clicked', () => {
    renderTaskItem();

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    // Should show confirmation dialog
    expect(screen.getByRole('alertdialog')).toBeInTheDocument();
    expect(screen.getByText(/delete task/i)).toBeInTheDocument();
  });

  it('calls onDelete when confirming deletion', () => {
    const onDelete = vi.fn();
    renderTaskItem(onDelete);

    // Open confirmation dialog
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    // Confirm deletion
    const confirmButton = screen.getByRole('button', { name: /^delete$/i });
    fireEvent.click(confirmButton);

    expect(onDelete).toHaveBeenCalledWith('test-id-1');
  });

  it('closes dialog when cancel is clicked', () => {
    const onDelete = vi.fn();
    renderTaskItem(onDelete);

    // Open confirmation dialog
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    // Cancel
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);

    // Dialog should be closed
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
    expect(onDelete).not.toHaveBeenCalled();
  });
});
