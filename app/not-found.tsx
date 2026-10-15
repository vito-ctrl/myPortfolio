import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-16 text-center">
      <div className="rounded border border-border bg-surface p-8 shadow-lab-md">
        <div className="font-mono text-xs uppercase tracking-wider text-accent">
          {'// ERROR 404'}
        </div>
        <h1 className="mt-2 font-mono text-2xl font-bold text-foreground sm:text-3xl">
          Specification Dossier Not Found
        </h1>
        <p className="mt-4 text-sm text-muted">
          The requested route, case study, or resource does not exist in this digital workstation.
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex min-h-[44px] items-center justify-center rounded border border-accent bg-accent px-5 py-2.5 font-mono text-xs font-semibold text-accent-contrast transition hover:bg-accent-hover"
          >
            ← Return to Lab Station
          </Link>
        </div>
      </div>
    </div>
  );
}
