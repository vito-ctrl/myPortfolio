import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { projects, getProjectBySlug, getArchitecture } from '@/content';
import { Badge } from '@/components/ui/Badge';
import { ArchitectureExplorer } from '@/components/architecture/ArchitectureExplorer';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found | Digital Lab',
    };
  }

  return {
    title: `${project.name} | Technical Dossier`,
    description: project.summary,
    openGraph: {
      title: `${project.name} | Technical Dossier`,
      description: project.summary,
      type: 'article',
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const isFinished = project.status === 'finished';
  const isPaused = project.status === 'paused';
  const statusVariant = isFinished ? 'accent' : isPaused ? 'warning' : 'default';
  const statusLabel = isFinished ? 'FINISHED' : isPaused ? 'ONGOING / PAUSED' : 'IN PROGRESS';

  const architecture = getArchitecture(project.slug);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      {/* Navigation Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8">
        <Link
          href="/#projects"
          className="inline-flex min-h-[44px] items-center gap-2 font-mono text-xs text-muted transition hover:text-accent focus-visible:underline"
        >
          <span aria-hidden="true">←</span>
          <span>Return to Projects Dossier</span>
        </Link>
      </nav>

      {/* Header & Metadata Spec Sheet */}
      <header className="rounded border border-border bg-surface p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4 font-mono text-xs">
          <div className="flex items-center gap-2 text-muted">
            <span className="text-accent">{'//'}</span>
            <span>SPECIFICATION RECORD:</span>
            <span className="font-semibold text-foreground">{project.slug.toUpperCase()}</span>
          </div>
          <Badge variant={statusVariant}>{statusLabel}</Badge>
        </div>

        <div className="mt-6">
          <h1 className="font-mono text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            {project.name}
          </h1>
          <p className="text-foreground/90 mt-3 text-base font-medium sm:text-lg">
            {project.tagline}
          </p>

          {project.statusNote && (
            <p className="mt-3 font-mono text-xs text-amber-600 dark:text-amber-400">
              [STATUS NOTE: {project.statusNote}]
            </p>
          )}

          {project.knownLimitation && (
            <div className="bg-surface-muted/60 mt-4 rounded border border-border p-3 text-xs text-muted">
              <span className="font-mono font-bold text-foreground">Known Limitation: </span>
              {project.knownLimitation}
            </div>
          )}
        </div>

        {/* Action Links Bar (Only rendered when URLs exist) */}
        {(project.repoUrl || project.demoUrl) && (
          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-border pt-4">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded border border-accent bg-accent px-4 py-2 font-mono text-xs font-semibold text-accent-contrast transition hover:bg-accent-hover"
              >
                <span>Launch Live Demo</span>
                <span aria-hidden="true">↗</span>
              </a>
            )}

            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded border border-border bg-background px-4 py-2 font-mono text-xs font-medium text-foreground transition hover:border-accent"
              >
                <span>View Source Code</span>
                <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        )}
      </header>

      {/* Main Content Sections */}
      <div className="mt-10 space-y-12">
        {/* Overview */}
        <section
          aria-labelledby="section-overview"
          className="rounded border border-border bg-surface p-6 sm:p-8"
        >
          <h2 id="section-overview" className="font-mono text-lg font-bold text-foreground">
            <span className="text-accent">{'// 01. '}</span>Overview
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted">{project.summary}</p>
        </section>

        {/* Problem It Solves (Only rendered if problem exists) */}
        {project.problem && (
          <section
            aria-labelledby="section-problem"
            className="rounded border border-border bg-surface p-6 sm:p-8"
          >
            <h2 id="section-problem" className="font-mono text-lg font-bold text-foreground">
              <span className="text-accent">{'// 02. '}</span>Problem It Solves
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">{project.problem}</p>
          </section>
        )}

        {/* Tech Stack */}
        <section
          aria-labelledby="section-stack"
          className="rounded border border-border bg-surface p-6 sm:p-8"
        >
          <h2 id="section-stack" className="font-mono text-lg font-bold text-foreground">
            <span className="text-accent">{'// 03. '}</span>Technology Stack
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded border border-border bg-surface-muted px-2.5 py-1 font-mono text-xs text-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* What Is Implemented */}
        <section
          aria-labelledby="section-implemented"
          className="rounded border border-border bg-surface p-6 sm:p-8"
        >
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h2 id="section-implemented" className="font-mono text-lg font-bold text-foreground">
              <span className="text-accent">{'// 04. '}</span>What Is Implemented
            </h2>
            <span className="font-mono text-xs text-accent">
              {project.implemented.length} verified features
            </span>
          </div>
          <ul className="divide-border/50 mt-4 divide-y text-sm text-muted">
            {project.implemented.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 py-2.5">
                <span className="mt-0.5 font-mono text-xs font-bold text-accent" aria-hidden="true">
                  [✓]
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Roadmap / Not Implemented (Only rendered if items exist) */}
        {project.notImplemented && project.notImplemented.length > 0 && (
          <section
            aria-labelledby="section-roadmap"
            className="rounded border border-border bg-surface p-6 sm:p-8"
          >
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h2 id="section-roadmap" className="font-mono text-lg font-bold text-foreground">
                <span className="text-accent">{'// 05. '}</span>Roadmap (not implemented)
              </h2>
              <span className="font-mono text-xs text-amber-600 dark:text-amber-400">
                PLANNED ONLY
              </span>
            </div>
            <p className="mt-3 text-xs text-muted">
              The following capabilities are deliberately documented as unfinished or future
              milestones; none are presented as built.
            </p>
            <ul className="divide-border/50 mt-4 divide-y text-sm text-muted">
              {project.notImplemented.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 py-2.5">
                  <span className="mt-0.5 font-mono text-xs text-amber-500" aria-hidden="true">
                    [○]
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Architecture Explorer (Only for My-City-Life and Sprintly) */}
        {architecture && (
          <section aria-label="System Architecture">
            <ArchitectureExplorer diagram={architecture} />
          </section>
        )}

        {/* Optional: My Role (Only rendered if provided) */}
        {project.role && (
          <section
            aria-labelledby="section-role"
            className="rounded border border-border bg-surface p-6 sm:p-8"
          >
            <h2 id="section-role" className="font-mono text-lg font-bold text-foreground">
              <span className="text-accent">{'// '}</span>Role &amp; Ownership
            </h2>
            <p className="mt-3 text-sm text-muted">{project.role}</p>
          </section>
        )}

        {/* Optional: Technical Decisions (Only rendered if provided) */}
        {project.decisions && project.decisions.length > 0 && (
          <section
            aria-labelledby="section-decisions"
            className="rounded border border-border bg-surface p-6 sm:p-8"
          >
            <h2 id="section-decisions" className="font-mono text-lg font-bold text-foreground">
              <span className="text-accent">{'// '}</span>Technical Decisions &amp; Trade-offs
            </h2>
            <div className="mt-4 space-y-4">
              {project.decisions.map((dec, idx) => (
                <div key={idx} className="bg-surface-muted/40 rounded border border-border p-4">
                  <h3 className="font-mono text-sm font-semibold text-foreground">{dec.title}</h3>
                  <p className="mt-1 text-xs text-muted">{dec.rationale}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Optional Screenshots (Only rendered if images exist) */}
        {project.screenshots && project.screenshots.length > 0 && (
          <section
            aria-labelledby="section-screenshots"
            className="rounded border border-border bg-surface p-6 sm:p-8"
          >
            <h2 id="section-screenshots" className="font-mono text-lg font-bold text-foreground">
              <span className="text-accent">{'// '}</span>Screenshots
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {project.screenshots.map((s, idx) => (
                <figure key={idx} className="rounded border border-border p-2">
                  {/* Image only if present */}
                  <figcaption className="mt-2 text-xs text-muted">{s.caption || s.alt}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
