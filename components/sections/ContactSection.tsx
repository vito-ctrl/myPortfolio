'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { profile } from '@/content';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24">
      <SectionHeader
        tag="04. Contact"
        title="Direct Communication Channels"
        description="Direct channels for internship opportunities, technical inquiries, and project discussions. No contact form or third-party tracking."
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Email Direct Contact */}
        <div className="flex flex-col justify-between rounded border border-border bg-surface p-6">
          <div>
            <div className="font-mono text-xs uppercase tracking-wider text-muted">
              Primary Channel
            </div>
            <h3 className="mt-1 font-mono text-xl font-bold text-foreground">
              Electronic Mail (Direct)
            </h3>
            <p className="mt-2 text-xs text-muted">
              Click to launch your email client, or copy the direct address.
            </p>

            <div className="bg-surface-muted/60 mt-4 break-all rounded border border-border p-3 font-mono text-sm font-semibold text-accent">
              <a
                href={`mailto:${profile.email}`}
                className="transition hover:underline focus-visible:underline"
              >
                {profile.email}
              </a>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex min-h-[44px] items-center justify-center rounded border border-accent bg-accent px-4 py-2 font-mono text-xs font-semibold text-accent-contrast transition hover:bg-accent-hover"
            >
              Compose Email ↗
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              aria-label="Copy email address to clipboard"
              className="inline-flex min-h-[44px] items-center justify-center rounded border border-border bg-background px-4 py-2 font-mono text-xs font-medium text-foreground transition hover:border-accent"
            >
              {copied ? '✓ Copied to clipboard' : 'Copy Email'}
            </button>
          </div>

          {/* Screen reader polite announcement */}
          <div aria-live="polite" className="sr-only">
            {copied ? 'Email address copied to clipboard.' : ''}
          </div>
        </div>

        {/* Profiles & Resume */}
        <div className="flex flex-col justify-between rounded border border-border bg-surface p-6">
          <div>
            <div className="font-mono text-xs uppercase tracking-wider text-muted">
              Profiles &amp; Verified Records
            </div>
            <h3 className="mt-1 font-mono text-xl font-bold text-foreground">
              Network &amp; Curriculum Vitae
            </h3>
            <p className="mt-2 text-xs text-muted">
              Access repositories, professional profile, and full PDF résumé.
            </p>

            <div className="mt-4 space-y-2">
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-surface-muted/30 flex min-h-[44px] items-center justify-between rounded border border-border px-3 py-2 transition hover:border-accent"
              >
                <span className="font-mono text-xs font-semibold text-foreground">
                  GitHub Profile
                </span>
                <span className="font-mono text-xs text-muted">@vito-ctrl ↗</span>
              </a>

              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-surface-muted/30 flex min-h-[44px] items-center justify-between rounded border border-border px-3 py-2 transition hover:border-accent"
              >
                <span className="font-mono text-xs font-semibold text-foreground">
                  LinkedIn Profile
                </span>
                <span className="font-mono text-xs text-muted">Aymane El Khadraoui ↗</span>
              </a>

              <Link
                href={profile.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border-accent/40 bg-accent/5 hover:bg-accent/10 flex min-h-[44px] items-center justify-between rounded border px-3 py-2 transition hover:border-accent"
              >
                <span className="font-mono text-xs font-semibold text-accent">
                  Curriculum Vitae (PDF)
                </span>
                <span className="font-mono text-xs text-accent">Download ↗</span>
              </Link>
            </div>
          </div>

          <div className="mt-6 font-mono text-xs text-muted">
            Location: {profile.location} • Status: {profile.statusLine}
          </div>
        </div>
      </div>
    </section>
  );
}
