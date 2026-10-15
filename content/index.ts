export * from './types';
export * from './profile';
export * from './skills';
export * from './projects';
export * from './architecture';

import { projects } from './projects';
import { Project } from './types';

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
