import React from 'react';
import Link from 'next/link';
import { Project } from '@/content/types';
import { Badge } from '@/components/ui/Badge';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const isFinished = project.status === 'finished';
  const isPaused = project.status === 'paused';

  const statusVariant = isFinished ? 'accent' : isPaused ? 'warning' : 'default';
  const statusLabel = isFinished ? 'FINISHED' : isPaused ? 'ONGOING / PAUSED' : 'IN PROGRESS';

  if (project.cardType === 'compact') {
    return (
      <div className="group rounded border border-border bg-surface p-4 transition hover:border-accent">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-mono text-base font-semibold text-foreground">
                <Link
                  href={`/projects/${project.slug}`}
                  className="transition hover:text-accent focus-visible:underline"
                >
                  {project.name}
                </Link>
              </h3>
              <Badge variant={statusVariant}>{statusLabel}</Badge>
            </div>
            <p className="text-xs text-muted">{project.tagline}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="flex flex-wrap gap-1">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded bg-surface-muted px-1.5 py-0.5 font-mono text-[11px] text-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2">
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[44px] items-center rounded border border-border px-2.5 py-1 font-mono text-xs text-muted transition hover:border-accent hover:text-foreground"
                >
                  Repo ↗
                </a>
              )}
              <Link
                href={`/projects/${project.slug}`}
                className="flex min-h-[44px] items-center rounded border border-border px-2.5 py-1 font-mono text-xs text-muted transition hover:border-accent hover:text-foreground"
              >
                Spec Sheet →
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isFeatured = project.cardType === 'featured';

  return (
    <article
      className={`hover:border-accent/80 relative flex flex-col justify-between rounded border border-border bg-surface p-6 transition hover:shadow-lab-md ${
        isFeatured ? 'md:col-span-2' : ''
      }`}
    >
      {/* Card Header & Spec Metadata */}
      <div>
        <div className="border-border/80 flex flex-wrap items-center justify-between gap-2 border-b pb-3 font-mono text-xs">
          <span className="text-muted">
            SPEC ID: <span className="text-foreground">{project.slug.toUpperCase()}</span>
          </span>
          <div className="flex items-center gap-2">
            <Badge variant={statusVariant}>{statusLabel}</Badge>
            {project.hasArchitecture && (
              <span className="border-accent/30 bg-accent/5 hidden rounded border px-1.5 py-0.5 text-[10px] text-accent sm:inline">
                Interactive Arch
              </span>
            )}
          </div>
        </div>

        {/* Title and Purpose */}
        <h3 className="mt-4 font-mono text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          <Link
            href={`/projects/${project.slug}`}
            className="transition hover:text-accent focus-visible:underline"
          >
            {project.name}
          </Link>
        </h3>
        <p className="text-foreground/90 mt-2 text-sm font-medium">{project.tagline}</p>

        {/* Status Note or Known Limitation if present */}
        {project.statusNote && (
          <p className="mt-2 font-mono text-xs text-amber-600 dark:text-amber-400">
            [NOTE: {project.statusNote}]
          </p>
        )}
        {project.knownLimitation && (
          <div className="bg-surface-muted/50 mt-3 rounded border border-border p-2 text-xs text-muted">
            <span className="font-mono font-semibold text-foreground">Limitation: </span>
            {project.knownLimitation}
          </div>
        )}

        {/* Summary */}
        <p className="mt-3 text-sm leading-relaxed text-muted">{project.summary}</p>

        {/* Key Implemented highlights for featured cards */}
        {isFeatured && project.implemented.length > 0 && (
          <div className="mt-4">
            <h4 className="font-mono text-xs uppercase tracking-wider text-muted">
              Key Implemented Capabilities:
            </h4>
            <ul className="mt-2 grid grid-cols-1 gap-1.5 text-xs text-muted sm:grid-cols-2">
              {project.implemented.slice(0, 4).map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-accent" aria-hidden="true">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Footer: Tech Stack and Action Links */}
      <div className="border-border/80 mt-6 border-t pt-4">
        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-1.5" aria-label="Technologies used">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded bg-surface-muted px-2 py-0.5 font-mono text-[11px] text-muted"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Links */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex min-h-[44px] items-center rounded border border-border bg-background px-3 py-1.5 font-mono text-xs font-medium text-foreground transition hover:border-accent hover:text-accent"
          >
            Case Study &amp; Details →
          </Link>

          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border-accent/40 bg-accent/5 inline-flex min-h-[44px] items-center gap-1 rounded border px-3 py-1.5 font-mono text-xs font-medium text-accent transition hover:bg-accent hover:text-accent-contrast"
            >
              <span>Live Demo</span>
              <span aria-hidden="true">↗</span>
            </a>
          )}

          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-1 rounded border border-border px-3 py-1.5 font-mono text-xs text-muted transition hover:border-foreground hover:text-foreground"
            >
              <span>Source</span>
              <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
