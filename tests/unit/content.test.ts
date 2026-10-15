import { describe, it, expect } from 'vitest';
import { profile, skillGroups, projects, architectureDiagrams, getProjectBySlug } from '@/content';

describe('Content Model Validation', () => {
  describe('Profile Data', () => {
    it('contains strictly verified facts', () => {
      expect(profile.name).toBe('Aymane El Khadraoui');
      expect(profile.title).toBe('Full Stack Developer (Java EE, Laravel, Next.js)');
      expect(profile.location).toBe('Beni Mellal, Morocco');
      expect(profile.email).toBe('aymane.elkhadraoui1@gmail.com');
      expect(profile.githubUrl).toMatch(/^https:\/\/github\.com\/vito-ctrl/);
      expect(profile.linkedinUrl).toMatch(/^https:\/\/www\.linkedin\.com\//);
      expect(profile.statusLine).toBe('Seeking a developer internship.');
      expect(profile.cvUrl).toBe('/cv/Aymane_El_Khadraoui_CV_EN.pdf');
    });

    it('contains valid education history', () => {
      expect(profile.education.length).toBe(2);
      expect(profile.education[0].institution).toContain('YouCode / UM6P');
      expect(profile.education[1].institution).toContain('Ahmed Al Hansali Digital School');
    });

    it('contains valid languages and activities', () => {
      expect(profile.languages.map((l) => l.language)).toEqual(['Arabic', 'English', 'French']);
      expect(profile.activities.length).toBeGreaterThan(0);
    });

    it('does not contain any empty strings or placeholder text', () => {
      expect(profile.name.trim()).not.toBe('');
      expect(profile.email.trim()).not.toBe('');
      profile.education.forEach((edu) => {
        expect(edu.degree.trim()).not.toBe('');
        expect(edu.institution.trim()).not.toBe('');
        expect(edu.location.trim()).not.toBe('');
        expect(edu.period.trim()).not.toBe('');
      });
    });
  });

  describe('Skill Groups', () => {
    it('contains the 5 required CV skill groups in order', () => {
      const groupNames = skillGroups.map((g) => g.name);
      expect(groupNames).toEqual([
        'Back end',
        'Front end',
        'Databases',
        'DevOps and tools',
        'Practices',
      ]);
    });

    it('all evidence links point to valid projects', () => {
      const validSlugs = new Set(projects.map((p) => p.slug));
      skillGroups.forEach((group) => {
        group.skills.forEach((skill) => {
          expect(skill.name.trim()).not.toBe('');
          if (skill.evidenceProjectSlug) {
            expect(validSlugs.has(skill.evidenceProjectSlug)).toBe(true);
          }
        });
      });
    });
  });

  describe('Projects Data', () => {
    it('contains exactly the 6 approved projects and NO excluded ones', () => {
      const slugs = projects.map((p) => p.slug);
      expect(slugs).toHaveLength(6);
      expect(slugs).toEqual([
        'my-city-life',
        'sprintly',
        'devcollab',
        'subtrack',
        'chance-to-freedom',
        'file-organizer-tool',
      ]);

      // Check strictly that excluded projects never appear
      const allText = JSON.stringify(projects).toLowerCase();
      expect(allText).not.toContain('cli-todo-app');
      expect(allText).not.toContain('talentia');
      expect(allText).not.toContain('order & delivery');
    });

    it('all project slugs are unique, kebab-case, and non-empty', () => {
      const slugs = projects.map((p) => p.slug);
      const uniqueSlugs = new Set(slugs);
      expect(uniqueSlugs.size).toBe(slugs.length);
      slugs.forEach((slug) => {
        expect(slug).toMatch(/^[a-z0-9-]+$/);
      });
    });

    it('all projects have required fields non-empty', () => {
      projects.forEach((p) => {
        expect(p.slug.trim()).not.toBe('');
        expect(p.name.trim()).not.toBe('');
        expect(p.tagline.trim()).not.toBe('');
        expect(['finished', 'ongoing', 'paused']).toContain(p.status);
        expect(p.summary.trim()).not.toBe('');
        expect(p.stack.length).toBeGreaterThan(0);
        expect(p.implemented.length).toBeGreaterThan(0);

        p.stack.forEach((item) => expect(item.trim()).not.toBe(''));
        p.implemented.forEach((item) => expect(item.trim()).not.toBe(''));

        if (p.notImplemented) {
          p.notImplemented.forEach((item) => expect(item.trim()).not.toBe(''));
        }
      });
    });

    it('urls use valid https when present', () => {
      projects.forEach((p) => {
        if (p.repoUrl) {
          expect(p.repoUrl).toMatch(/^https:\/\//);
        }
        if (p.demoUrl) {
          expect(p.demoUrl).toMatch(/^https:\/\//);
        }
      });
    });

    it('omits repoUrl and role for Sprintly as requested', () => {
      const sprintly = getProjectBySlug('sprintly');
      expect(sprintly).toBeDefined();
      expect(sprintly?.repoUrl).toBeUndefined();
      expect(sprintly?.role).toBeUndefined();
    });

    it('omits repoUrl for SubTrack and documents in-memory limitation', () => {
      const subtrack = getProjectBySlug('subtrack');
      expect(subtrack).toBeDefined();
      expect(subtrack?.repoUrl).toBeUndefined();
      expect(subtrack?.knownLimitation).toContain('in memory only');
    });

    it('identifies My-City-Life as solo project with full implemented scope', () => {
      const mcl = getProjectBySlug('my-city-life');
      expect(mcl).toBeDefined();
      expect(mcl?.role).toContain('Solo developer');
      expect(mcl?.notImplemented).toHaveLength(4);
    });

    it('labels DevCollab as paused with foundation built', () => {
      const devcollab = getProjectBySlug('devcollab');
      expect(devcollab).toBeDefined();
      expect(devcollab?.status).toBe('paused');
      expect(devcollab?.statusNote).toBe('Foundation built, development paused.');
    });
  });

  describe('Architecture Diagrams', () => {
    it('defines architecture only for My-City-Life and Sprintly', () => {
      const architectureSlugs = Object.keys(architectureDiagrams);
      expect(architectureSlugs.sort()).toEqual(['my-city-life', 'sprintly'].sort());
    });

    it('validates all node link targets exist within the diagram', () => {
      Object.values(architectureDiagrams).forEach((diagram) => {
        const nodeIds = new Set(diagram.nodes.map((n) => n.id));
        diagram.nodes.forEach((node) => {
          expect(node.id.trim()).not.toBe('');
          expect(node.label.trim()).not.toBe('');
          expect(node.description.trim()).not.toBe('');
          expect(node.tech.length).toBeGreaterThan(0);
          node.linksTo.forEach((targetId) => {
            expect(nodeIds.has(targetId)).toBe(true);
          });
        });
      });
    });
  });
});
