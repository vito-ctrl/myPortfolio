import React from 'react';
import Link from 'next/link';
import { profile } from '@/content';

export function Hero() {
  return (
    <section className="relative border-b border-border py-16 sm:py-24">
      {/* Status Bar Strip */}
      <div className="mb-8 inline-flex flex-wrap items-center gap-x-4 gap-y-2 rounded border border-border bg-surface px-3 py-1.5 font-mono text-xs text-muted">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="text-foreground">STATUS:</span>
          <span>{profile.statusLine}</span>
        </div>
        <span className="hidden text-border sm:inline">|</span>
        <div>
          <span className="text-foreground">LOC:</span> {profile.location}
        </div>
        <span className="hidden text-border sm:inline">|</span>
        <div>
          <span className="text-foreground">SPEC:</span> Java EE • Laravel • Next.js
        </div>
      </div>

      {/* Main Hero Header */}
      <div className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">
          {'// Digital Lab & Workstation'}
        </p>
        <h1 className="mt-2 font-mono text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl sm:leading-tight">
          {profile.name}
        </h1>
        <p className="mt-4 font-mono text-lg text-muted sm:text-xl">{profile.title}</p>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          Engineering practical web applications with solid backend architectures, typed schemas,
          and responsive user interfaces. Currently preparing for professional full stack
          engineering challenges.
        </p>

        {/* Three Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="#projects"
            className="inline-flex min-h-[44px] items-center justify-center rounded border border-accent bg-accent px-5 py-2.5 font-mono text-xs font-semibold text-accent-contrast shadow-lab-sm transition hover:bg-accent-hover focus-visible:ring-2 focus-visible:ring-accent"
          >
            View Projects
          </Link>
          <Link
            href={profile.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center justify-center rounded border border-border bg-surface px-5 py-2.5 font-mono text-xs font-semibold text-foreground transition hover:border-accent hover:text-accent focus-visible:ring-2 focus-visible:ring-accent"
          >
            Download CV (PDF)
          </Link>
          <Link
            href="#contact"
            className="inline-flex min-h-[44px] items-center justify-center rounded border border-border bg-transparent px-5 py-2.5 font-mono text-xs font-medium text-muted transition hover:border-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent"
          >
            Contact
          </Link>
        </div>
      </div>
    </section>
  );
}
