'use client';

import React from 'react';
import { ArchitectureDiagram } from '@/content/types';

interface ArchitectureExplorerProps {
  diagram: ArchitectureDiagram;
}

export function ArchitectureExplorer({ diagram }: ArchitectureExplorerProps) {
  return (
    <div
      className="rounded border border-border bg-surface p-6"
      data-testid="architecture-explorer"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-accent">
            {'// ARCHITECTURE EXPLORER'}
          </span>
          <h3 className="font-mono text-lg font-bold text-foreground">{diagram.title}</h3>
        </div>
        <span className="font-mono text-xs text-muted">{diagram.nodes.length} Nodes</span>
      </div>
      <p className="mt-2 text-xs text-muted">{diagram.description}</p>

      {/* Nodes list / diagram representation */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {diagram.nodes.map((node) => (
          <div
            key={node.id}
            tabIndex={0}
            role="button"
            aria-label={`Node: ${node.label}`}
            className="bg-surface-muted/40 rounded border border-border p-4 transition hover:border-accent focus-visible:ring-2 focus-visible:ring-accent"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-accent">{node.label}</span>
              <span className="font-mono text-[10px] uppercase text-muted">[{node.kind}]</span>
            </div>
            <p className="mt-2 text-xs text-muted">{node.description}</p>
            <div className="mt-3 flex flex-wrap gap-1">
              {node.tech.map((t) => (
                <span
                  key={t}
                  className="rounded bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
