export type ProjectStatus = 'finished' | 'ongoing' | 'paused';

export type ProjectCardType = 'featured' | 'medium' | 'compact';

export interface ProjectDecision {
  title: string;
  rationale: string;
}

export interface ProjectScreenshot {
  src: string;
  alt: string;
  caption?: string;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  status: ProjectStatus;
  statusNote?: string;
  featured: boolean;
  cardType: ProjectCardType;
  summary: string;
  problem?: string;
  stack: string[];
  implemented: string[];
  notImplemented?: string[];
  knownLimitation?: string;
  repoUrl?: string;
  demoUrl?: string;
  role?: string;
  decisions?: ProjectDecision[];
  screenshots?: ProjectScreenshot[];
  hasArchitecture?: boolean;
}

export interface SkillItem {
  name: string;
  evidenceProjectSlug?: string;
}

export interface SkillGroup {
  name: string;
  skills: SkillItem[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  focus?: string;
}

export interface LanguageItem {
  language: string;
  level: string;
}

export interface ProfileData {
  name: string;
  title: string;
  location: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  statusLine: string;
  cvUrl: string;
  education: EducationItem[];
  languages: LanguageItem[];
  activities: string[];
}

export type ArchitectureNodeKind =
  'client' | 'api' | 'database' | 'service' | 'auth' | 'algorithm' | 'security';

export interface ArchitectureNode {
  id: string;
  label: string;
  kind: ArchitectureNodeKind;
  description: string;
  tech: string[];
  linksTo: string[];
}

export interface ArchitectureDiagram {
  projectSlug: string;
  title: string;
  description: string;
  nodes: ArchitectureNode[];
}
