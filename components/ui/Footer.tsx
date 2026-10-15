import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-surface/50 mt-auto w-full border-t border-border py-8 font-mono text-xs text-muted">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="text-foreground">
            Aymane El Khadraoui <span className="text-muted">/ Digital Lab</span>
          </p>
          <p className="mt-1 text-muted">Full Stack Developer — Beni Mellal, Morocco</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href="https://github.com/vito-ctrl"
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[44px] items-center transition-colors hover:text-accent"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/aymane-elkhadraoui-79b223263/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[44px] items-center transition-colors hover:text-accent"
          >
            LinkedIn
          </a>
          <a
            href="mailto:aymane.elkhadraoui1@gmail.com"
            className="flex min-h-[44px] items-center transition-colors hover:text-accent"
          >
            Email
          </a>
          <Link
            href="/cv/Aymane_El_Khadraoui_CV_EN.pdf"
            className="flex min-h-[44px] items-center transition-colors hover:text-accent"
          >
            CV (PDF)
          </Link>
        </div>
      </div>
      <div className="border-border/60 mx-auto mt-6 max-w-6xl border-t px-4 pt-4 text-[11px] text-muted sm:px-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span>Static Generation • Zero Tracking • System Theme</span>
          <span>Status: Seeking a developer internship</span>
        </div>
      </div>
    </footer>
  );
}
