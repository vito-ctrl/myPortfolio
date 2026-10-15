import React from 'react';
import { profile } from '@/content';
import { Hero } from '@/components/sections/Hero';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ContactSection } from '@/components/sections/ContactSection';

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.title,
    email: profile.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Beni Mellal',
      addressCountry: 'Morocco',
    },
    sameAs: [profile.githubUrl, profile.linkedinUrl],
    alumniOf: profile.education.map((edu) => ({
      '@type': 'EducationalOrganization',
      name: edu.institution,
    })),
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

      <Hero />
      <ProjectsSection />
      <SkillsSection />
      <AboutSection />
      <ContactSection />
    </div>
  );
}
