'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { openCommandPalette } from '@/lib/palette';

export function Header() {
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMac(/(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent));
    }
  }, []);

  return (
    <header className="bg-surface/90 sticky top-0 z-40 w-full border-b border-border backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="group flex min-h-[44px] items-center gap-2 font-mono text-sm font-semibold tracking-tight text-foreground transition-colors hover:text-accent focus-visible:text-accent"
        >
          <span className="flex h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
          <span className="text-foreground">Aymane El Khadraoui</span>
          <span className="hidden text-xs text-muted sm:inline" aria-hidden="true">
            / digital-lab
          </span>
        </Link>

        {/* Navigation & Actions */}
        <div className="flex items-center gap-2 sm:gap-6">
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-1 font-mono text-xs md:flex"
          >
            <Link
              href="/#projects"
              className="flex min-h-[44px] items-center px-3 py-2 text-muted transition-colors hover:text-foreground"
            >
              Projects
            </Link>
            <Link
              href="/#skills"
              className="flex min-h-[44px] items-center px-3 py-2 text-muted transition-colors hover:text-foreground"
            >
              Skills
            </Link>
            <Link
              href="/#about"
              className="flex min-h-[44px] items-center px-3 py-2 text-muted transition-colors hover:text-foreground"
            >
              About
            </Link>
            <Link
              href="/#contact"
              className="flex min-h-[44px] items-center px-3 py-2 text-muted transition-colors hover:text-foreground"
            >
              Contact
            </Link>
          </nav>

          {/* Command Palette Button */}
          <button
            type="button"
            onClick={openCommandPalette}
            aria-label="Open command palette (Ctrl+K or Cmd+K)"
            className="flex min-h-[44px] items-center gap-2 rounded border border-border bg-background px-3 py-1.5 font-mono text-xs text-muted transition hover:border-accent hover:text-foreground"
          >
            <svg
              className="h-3.5 w-3.5 text-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span className="hidden sm:inline">Command</span>
            <kbd className="hidden rounded border border-border bg-surface px-1.5 py-0.5 text-[10px] text-muted sm:inline-block">
              {isMac ? '⌘K' : 'Ctrl+K'}
            </kbd>
          </button>
        </div>
      </div>
    </header>
  );
}
