import React from 'react';
import { projects } from '@/content';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ProjectCard } from '@/components/projects/ProjectCard';

export function ProjectsSection() {
  const featuredProjects = projects.filter((p) => p.cardType === 'featured');
  const mediumProjects = projects.filter((p) => p.cardType === 'medium');
  const compactProjects = projects.filter((p) => p.cardType === 'compact');

  return (
    <section id="projects" className="border-b border-border py-16 sm:py-24">
      <SectionHeader
        tag="01. Projects"
        title="Engineering Dossier &amp; Builds"
        description="A verified collection of production-grade systems, architectural prototypes, and engineering utilities. No unverified figures or embellishments."
      />

      {/* Featured Projects Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {/* Medium Projects Grid */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        {mediumProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {/* Compact Row */}
      {compactProjects.length > 0 && (
        <div className="mt-6 space-y-4">
          <div className="font-mono text-xs text-muted">
            <span>{'// UTILITY & CLI TOOLS'}</span>
          </div>
          {compactProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}
