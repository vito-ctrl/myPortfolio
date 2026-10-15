import React from 'react';
import { profile } from '@/content';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function AboutSection() {
  return (
    <section id="about" className="border-b border-border py-16 sm:py-24">
      <SectionHeader
        tag="03. About"
        title="Education &amp; Background"
        description="Factual summary of academic training, linguistic proficiency, and community leadership."
      />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Education Timeline */}
        <div className="rounded border border-border bg-surface p-6">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <span className="font-mono text-xs uppercase tracking-wider text-accent">
              {'// 01'}
            </span>
            <h3 className="font-mono text-base font-bold text-foreground">Formal Education</h3>
          </div>

          <div className="mt-4 space-y-6">
            {profile.education.map((item, idx) => (
              <div key={idx} className="relative border-l border-border pl-4">
                <span className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-accent" />
                <div className="font-mono text-xs text-accent">{item.period}</div>
                <h4 className="mt-1 font-mono text-sm font-semibold text-foreground">
                  {item.degree}
                </h4>
                <div className="text-xs text-muted">
                  {item.institution} — {item.location}
                </div>
                {item.focus && (
                  <div className="text-foreground/80 mt-1 font-mono text-xs">
                    <span className="text-muted">Focus:</span> {item.focus}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Languages & Activities */}
        <div className="flex flex-col gap-6">
          {/* Languages */}
          <div className="rounded border border-border bg-surface p-6">
            <div className="flex items-center gap-2 border-b border-border pb-3">
              <span className="font-mono text-xs uppercase tracking-wider text-accent">
                {'// 02'}
              </span>
              <h3 className="font-mono text-base font-bold text-foreground">Languages</h3>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {profile.languages.map((lang) => (
                <div
                  key={lang.language}
                  className="bg-surface-muted/50 rounded border border-border p-3 text-center"
                >
                  <div className="font-mono text-sm font-bold text-foreground">{lang.language}</div>
                  <div className="mt-1 font-mono text-xs text-muted">{lang.level}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Activities */}
          <div className="rounded border border-border bg-surface p-6">
            <div className="flex items-center gap-2 border-b border-border pb-3">
              <span className="font-mono text-xs uppercase tracking-wider text-accent">
                {'// 03'}
              </span>
              <h3 className="font-mono text-base font-bold text-foreground">
                Activities &amp; Leadership
              </h3>
            </div>
            <ul className="mt-4 space-y-2.5 text-xs text-muted">
              {profile.activities.map((activity, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-accent" aria-hidden="true">
                    ▸
                  </span>
                  <span className="text-foreground/90">{activity}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
