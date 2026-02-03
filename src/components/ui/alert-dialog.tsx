import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from './button';

interface AlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

interface AlertDialogContentProps {
  children: React.ReactNode;
  className?: string;
}

interface AlertDialogHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface AlertDialogFooterProps {
  children: React.ReactNode;
  className?: string;
}

interface AlertDialogTitleProps {
  children: React.ReactNode;
  className?: string;
}

interface AlertDialogDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

interface AlertDialogActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

interface AlertDialogCancelProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const AlertDialogContext = React.createContext<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
} | null>(null);

function useAlertDialog() {
  const context = React.useContext(AlertDialogContext);
  if (!context) {
    throw new Error('AlertDialog components must be used within an AlertDialog');
  }
  return context;
}

export function AlertDialog({ open, onOpenChange, children }: AlertDialogProps) {
  return (
    <AlertDialogContext.Provider value={{ open, onOpenChange }}>
      {children}
    </AlertDialogContext.Provider>
  );
}

export function AlertDialogContent({ children, className }: AlertDialogContentProps) {
  const { open, onOpenChange } = useAlertDialog();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      <div
        className={cn(
          'relative z-50 mx-4 w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-800',
          'animate-in fade-in-0 zoom-in-95',
          className
        )}
        role="alertdialog"
        aria-modal="true"
      >
        {children}
      </div>
    </div>
  );
}

export function AlertDialogHeader({ children, className }: AlertDialogHeaderProps) {
  return (
    <div className={cn('mb-4 space-y-2', className)}>
      {children}
    </div>
  );
}

export function AlertDialogFooter({ children, className }: AlertDialogFooterProps) {
  return (
    <div className={cn('mt-6 flex justify-end gap-3', className)}>
      {children}
    </div>
  );
}

export function AlertDialogTitle({ children, className }: AlertDialogTitleProps) {
  return (
    <h2 className={cn('text-lg font-semibold text-slate-900 dark:text-white', className)}>
      {children}
    </h2>
  );
}

export function AlertDialogDescription({ children, className }: AlertDialogDescriptionProps) {
  return (
    <p className={cn('text-sm text-slate-600 dark:text-slate-400', className)}>
      {children}
    </p>
  );
}

export function AlertDialogAction({ children, className, ...props }: AlertDialogActionProps) {
  return (
    <Button variant="destructive" className={className} {...props}>
      {children}
    </Button>
  );
}

export function AlertDialogCancel({ children, className, ...props }: AlertDialogCancelProps) {
  const { onOpenChange } = useAlertDialog();

  return (
    <Button
      variant="outline"
      className={className}
      onClick={() => onOpenChange(false)}
      {...props}
    >
      {children}
    </Button>
  );
}
