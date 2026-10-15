import React from 'react';

interface SectionHeaderProps {
  id?: string;
  tag: string;
  title: string;
  description?: string;
}

export function SectionHeader({ id, tag, title, description }: SectionHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 font-mono text-xs text-accent">
        <span>{'//'}</span>
        <span className="uppercase tracking-wider">{tag}</span>
      </div>
      <h2
        id={id}
        className="mt-1 font-mono text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
      >
        {title}
      </h2>
      {description && <p className="mt-2 max-w-2xl text-sm text-muted">{description}</p>}
    </div>
  );
}
