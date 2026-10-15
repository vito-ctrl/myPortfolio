import { ArchitectureDiagram } from '../types';
import { myCityLifeArchitecture } from './my-city-life';
import { sprintlyArchitecture } from './sprintly';

export const architectureDiagrams: Record<string, ArchitectureDiagram> = {
  'my-city-life': myCityLifeArchitecture,
  sprintly: sprintlyArchitecture,
};

export function getArchitecture(slug: string): ArchitectureDiagram | undefined {
  return architectureDiagrams[slug];
}
