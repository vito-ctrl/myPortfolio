'use client';

import React, { useState, useMemo } from 'react';
import { ArchitectureDiagram, ArchitectureNode } from '@/content/types';
import { Badge } from '@/components/ui/Badge';

interface ArchitectureExplorerProps {
  diagram: ArchitectureDiagram;
}

// Preset grid coordinates for diagram nodes (desktop SVG view)
const NODE_COORDINATES: Record<string, Record<string, { x: number; y: number }>> = {
  'my-city-life': {
    'react-spa': { x: 70, y: 180 },
    'laravel-api': { x: 380, y: 180 },
    'mysql-db': { x: 690, y: 70 },
    'stripe-gateway': { x: 690, y: 180 },
    'oauth-providers': { x: 690, y: 290 },
    'laravel-reverb': { x: 230, y: 310 },
    'moderation-roles': { x: 380, y: 60 },
  },
  sprintly: {
    'react-spa': { x: 80, y: 180 },
    'express-api': { x: 390, y: 180 },
    mongodb: { x: 690, y: 100 },
    'email-service': { x: 690, y: 260 },
    'ring-algorithm': { x: 390, y: 310 },
    'role-access': { x: 390, y: 60 },
  },
};

export function ArchitectureExplorer({ diagram }: ArchitectureExplorerProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string>(diagram.nodes[0]?.id || '');

  const selectedNode = useMemo(() => {
    return diagram.nodes.find((n) => n.id === selectedNodeId) || diagram.nodes[0];
  }, [diagram.nodes, selectedNodeId]);

  // Outgoing connections from selected node
  const outgoingNodes = useMemo(() => {
    if (!selectedNode) return [];
    return diagram.nodes.filter((n) => selectedNode.linksTo.includes(n.id));
  }, [diagram.nodes, selectedNode]);

  // Incoming connections to selected node
  const incomingNodes = useMemo(() => {
    if (!selectedNode) return [];
    return diagram.nodes.filter((n) => n.linksTo.includes(selectedNode.id));
  }, [diagram.nodes, selectedNode]);

  const coordsMap = NODE_COORDINATES[diagram.projectSlug] || {};

  // Build edges list
  const edges = useMemo(() => {
    const list: Array<{ from: ArchitectureNode; to: ArchitectureNode; id: string }> = [];
    diagram.nodes.forEach((fromNode) => {
      fromNode.linksTo.forEach((targetId) => {
        const toNode = diagram.nodes.find((n) => n.id === targetId);
        if (toNode) {
          list.push({
            id: `${fromNode.id}->${toNode.id}`,
            from: fromNode,
            to: toNode,
          });
        }
      });
    });
    return list;
  }, [diagram.nodes]);

  return (
    <div
      className="rounded border border-border bg-surface p-6 sm:p-8"
      data-testid="architecture-explorer"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-accent">
            <span>{'//'}</span>
            <span className="uppercase tracking-wider">SYSTEM TOPOLOGY &amp; ARCHITECTURE</span>
          </div>
          <h2 className="mt-1 font-mono text-xl font-bold text-foreground sm:text-2xl">
            {diagram.title}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="accent">{diagram.nodes.length} Verified Nodes</Badge>
          <span className="font-mono text-xs text-muted">Interactive Explorer</span>
        </div>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-muted sm:text-sm">
        {diagram.description} Click or press Enter/Space on any node to trace its network
        dependencies, authentication guards, and data pipelines.
      </p>

      {/* Interactive Visual Graph (Visible on medium and larger screens) */}
      <div className="bg-surface-muted/30 mt-8 hidden overflow-hidden rounded border border-border p-4 md:block">
        <div className="relative mx-auto h-[400px] w-full max-w-[840px]">
          {/* SVG Connection Lines */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 840 400"
            aria-hidden="true"
          >
            <defs>
              <marker
                id="arrow-default"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--border)" />
              </marker>
              <marker
                id="arrow-active"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--accent)" />
              </marker>
            </defs>

            {edges.map((edge) => {
              const start = coordsMap[edge.from.id] || { x: 100, y: 100 };
              const end = coordsMap[edge.to.id] || { x: 200, y: 200 };

              const isConnectedToSelected =
                edge.from.id === selectedNodeId || edge.to.id === selectedNodeId;

              // Node button dimensions approx w: 140, h: 48
              const startX = start.x + 70;
              const startY = start.y + 24;
              const endX = end.x + 70;
              const endY = end.y + 24;

              return (
                <line
                  key={edge.id}
                  x1={startX}
                  y1={startY}
                  x2={endX}
                  y2={endY}
                  stroke={isConnectedToSelected ? 'var(--accent)' : 'var(--border)'}
                  strokeWidth={isConnectedToSelected ? '2.5' : '1.5'}
                  strokeDasharray={isConnectedToSelected ? undefined : '3,3'}
                  markerEnd={isConnectedToSelected ? 'url(#arrow-active)' : 'url(#arrow-default)'}
                  className="transition-all duration-200"
                />
              );
            })}
          </svg>

          {/* Interactive HTML Node Buttons placed over SVG */}
          {diagram.nodes.map((node) => {
            const pos = coordsMap[node.id] || { x: 50, y: 50 };
            const isSelected = node.id === selectedNodeId;
            const isConnected =
              selectedNode?.linksTo.includes(node.id) || node.linksTo.includes(selectedNodeId);

            return (
              <button
                key={node.id}
                type="button"
                style={{
                  left: `${pos.x}px`,
                  top: `${pos.y}px`,
                  width: '140px',
                }}
                onClick={() => setSelectedNodeId(node.id)}
                aria-pressed={isSelected}
                aria-label={`Node ${node.label}, ${node.kind}`}
                className={`absolute flex min-h-[44px] flex-col justify-center rounded border p-2 text-left font-mono text-xs transition-all focus-visible:ring-2 focus-visible:ring-accent ${
                  isSelected
                    ? 'ring-accent/40 border-accent bg-accent text-accent-contrast shadow-lab-md ring-2'
                    : isConnected
                      ? 'border-accent/70 ring-accent/30 bg-surface text-foreground ring-1'
                      : 'hover:border-accent/60 border-border bg-surface text-foreground'
                }`}
              >
                <span className="line-clamp-1 font-semibold leading-tight">{node.label}</span>
                <span
                  className={`text-[9px] uppercase tracking-wider ${
                    isSelected ? 'text-accent-contrast/80' : 'text-muted'
                  }`}
                >
                  [{node.kind}]
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Fallback Stack Layout for Narrow Screens (< 768px) */}
      <div className="mt-6 md:hidden">
        <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-muted">
          Select Node to Inspect:
        </h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {diagram.nodes.map((node) => {
            const isSelected = node.id === selectedNodeId;
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => setSelectedNodeId(node.id)}
                aria-pressed={isSelected}
                className={`inline-flex min-h-[44px] items-center rounded border px-3 py-1.5 font-mono text-xs transition ${
                  isSelected
                    ? 'border-accent bg-accent text-accent-contrast'
                    : 'border-border bg-surface text-foreground hover:border-accent'
                }`}
              >
                {node.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Node Detail Panel (Polite live region for accessibility) */}
      {selectedNode && (
        <div
          aria-live="polite"
          data-testid="node-detail-panel"
          className="border-accent/40 bg-surface-muted/40 mt-6 rounded border p-5 shadow-lab-sm"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
              <h3 className="font-mono text-base font-bold text-foreground">
                {selectedNode.label}
              </h3>
              <Badge variant="muted">[{selectedNode.kind.toUpperCase()}]</Badge>
            </div>
            <span className="font-mono text-xs text-muted">NODE ID: {selectedNode.id}</span>
          </div>

          <p className="text-foreground/90 mt-3 text-sm">{selectedNode.description}</p>

          {/* Technologies */}
          <div className="mt-4">
            <h4 className="font-mono text-xs uppercase tracking-wider text-muted">Technologies:</h4>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {selectedNode.tech.map((t) => (
                <span
                  key={t}
                  className="rounded border border-border bg-surface px-2 py-0.5 font-mono text-[11px] text-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Outgoing & Incoming Connections */}
          <div className="mt-5 grid grid-cols-1 gap-4 border-t border-border pt-4 sm:grid-cols-2">
            <div>
              <h4 className="font-mono text-xs uppercase tracking-wider text-muted">
                Outgoing Connections ({outgoingNodes.length}):
              </h4>
              {outgoingNodes.length === 0 ? (
                <p className="mt-1 font-mono text-xs text-muted">
                  No outgoing links (Terminal node)
                </p>
              ) : (
                <div className="mt-2 flex flex-wrap gap-2">
                  {outgoingNodes.map((out) => (
                    <button
                      key={out.id}
                      type="button"
                      onClick={() => setSelectedNodeId(out.id)}
                      className="inline-flex min-h-[36px] items-center gap-1 rounded border border-border bg-surface px-2.5 py-1 font-mono text-xs text-muted transition hover:border-accent hover:text-foreground"
                    >
                      <span>→ {out.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h4 className="font-mono text-xs uppercase tracking-wider text-muted">
                Incoming Connections ({incomingNodes.length}):
              </h4>
              {incomingNodes.length === 0 ? (
                <p className="mt-1 font-mono text-xs text-muted">
                  No incoming links (Client entry point)
                </p>
              ) : (
                <div className="mt-2 flex flex-wrap gap-2">
                  {incomingNodes.map((inc) => (
                    <button
                      key={inc.id}
                      type="button"
                      onClick={() => setSelectedNodeId(inc.id)}
                      className="inline-flex min-h-[36px] items-center gap-1 rounded border border-border bg-surface px-2.5 py-1 font-mono text-xs text-muted transition hover:border-accent hover:text-foreground"
                    >
                      <span>← {inc.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
