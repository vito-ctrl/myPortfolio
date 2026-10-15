import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'warning' | 'muted';
  className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variantStyles = {
    default: 'bg-surface text-foreground border-border',
    accent: 'bg-accent/10 text-accent border-accent/30',
    warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
    muted: 'bg-surface-muted text-muted border-border-subtle',
  };

  return (
    <span
      className={`inline-flex items-center rounded border px-2 py-0.5 font-mono text-xs font-medium tracking-tight ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
