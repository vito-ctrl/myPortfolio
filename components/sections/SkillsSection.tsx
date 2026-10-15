import React from 'react';
import Link from 'next/link';
import { skillGroups } from '@/content';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function SkillsSection() {
  return (
    <section id="skills" className="border-b border-border py-16 sm:py-24">
      <SectionHeader
        tag="02. Skills"
        title="Technical Arsenal &amp; Disciplines"
        description="Core competencies grouped exactly as on my curriculum vitae. Verified implementation evidence links to corresponding project dossiers."
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <div
            key={group.name}
            className="hover:border-accent/60 flex flex-col justify-between rounded border border-border bg-surface p-5 transition"
          >
            <div>
              <div className="border-border/80 flex items-center justify-between border-b pb-2">
                <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-foreground">
                  {group.name}
                </h3>
                <span className="font-mono text-[11px] text-muted">
                  {group.skills.length} skills
                </span>
              </div>

              <ul className="divide-border/40 mt-3 divide-y text-xs">
                {group.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="flex min-h-[44px] items-center justify-between py-1.5"
                  >
                    <span className="font-medium text-foreground">{skill.name}</span>

                    {skill.evidenceProjectSlug ? (
                      <Link
                        href={`/projects/${skill.evidenceProjectSlug}`}
                        className="border-accent/30 bg-accent/5 inline-flex min-h-[36px] items-center gap-1 rounded border px-2 py-1 font-mono text-[11px] text-accent transition hover:bg-accent hover:text-accent-contrast focus-visible:ring-1 focus-visible:ring-accent"
                        title={`View implementation evidence in ${skill.evidenceProjectSlug}`}
                      >
                        <span>Evidence</span>
                        <span aria-hidden="true">→</span>
                      </Link>
                    ) : (
                      <span className="font-mono text-[11px] text-muted">—</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
