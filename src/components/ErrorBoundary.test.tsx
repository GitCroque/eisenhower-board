import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';

function Bomb(): never {
  throw new Error('secret internal detail');
}

beforeEach(() => {
  // Silence the expected React error logs for the thrown test error.
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <p>All good</p>
      </ErrorBoundary>,
    );

    expect(screen.getByText('All good')).toBeInTheDocument();
  });

  it('renders the fallback UI without exposing the raw error message', () => {
    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>,
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('An unexpected error occurred')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
    expect(screen.queryByText(/secret internal detail/i)).not.toBeInTheDocument();
  });

  it('renders a custom fallback when provided', () => {
    render(
      <ErrorBoundary fallback={<p>Custom fallback</p>}>
        <Bomb />
      </ErrorBoundary>,
    );

    expect(screen.getByText('Custom fallback')).toBeInTheDocument();
  });

  it('uses the persisted language for the fallback copy', async () => {
    window.localStorage.setItem('eisenhower-language', JSON.stringify('fr'));

    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>,
    );

    await waitFor(() => {
      expect(screen.getByText("Une erreur inattendue s'est produite")).toBeInTheDocument();
    });
  });
});
