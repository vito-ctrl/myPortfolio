import { ArchitectureDiagram } from '../types';

export const sprintlyArchitecture: ArchitectureDiagram = {
  projectSlug: 'sprintly',
  title: 'Sprintly Architecture Overview',
  description:
    'Peer evaluation platform featuring secure API gateway middleware, document persistence, automated password resets, and a ring-shuffling evaluation algorithm.',
  nodes: [
    {
      id: 'react-spa',
      label: 'React SPA Client',
      kind: 'client',
      description:
        'Single-page application providing dashboards for students, trainers, and administrators.',
      tech: ['React 19', 'Vite', 'Tailwind CSS 4', 'React Router'],
      linksTo: ['express-api'],
    },
    {
      id: 'express-api',
      label: 'Express API Server',
      kind: 'api',
      description:
        'Hardened backend API with security headers, credentialed CORS, cookie management, rate limiting, and centralized error handling.',
      tech: ['Node.js', 'Express', 'Helmet', 'CORS Middleware', 'Rate Limiter'],
      linksTo: ['mongodb', 'email-service', 'ring-algorithm', 'role-access'],
    },
    {
      id: 'mongodb',
      label: 'MongoDB (Mongoose)',
      kind: 'database',
      description:
        'Document database modeling domain collections: User, Team, Project, Evaluation, and Completion.',
      tech: ['MongoDB', 'Mongoose ODM'],
      linksTo: [],
    },
    {
      id: 'email-service',
      label: 'Email Service',
      kind: 'service',
      description:
        'Transactional notification service delivering password reset tokens and links to user inboxes.',
      tech: ['SMTP / Email Handler'],
      linksTo: [],
    },
    {
      id: 'ring-algorithm',
      label: 'Evaluation-Ring Algorithm',
      kind: 'algorithm',
      description:
        'Shuffles teams with a cryptographically secure RNG and arranges them in a ring: team i evaluates team (i+1), guaranteeing every team evaluates exactly one and is evaluated by exactly one.',
      tech: ['Crypto RNG', 'Graph Ring Partitioning'],
      linksTo: ['mongodb'],
    },
    {
      id: 'role-access',
      label: 'Role-Based Permissions',
      kind: 'security',
      description:
        'Three distinct permission tiers: admin (system administration), trainer (cohort stats and team evaluation management), and student (peer testing).',
      tech: ['Role Guards', 'Session Cookies'],
      linksTo: [],
    },
  ],
};
