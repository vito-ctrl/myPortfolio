import { SkillGroup } from './types';

export const skillGroups: SkillGroup[] = [
  {
    name: 'Back end',
    skills: [
      { name: 'Java', evidenceProjectSlug: 'subtrack' },
      { name: 'Java EE' },
      { name: 'PHP' },
      { name: 'Laravel', evidenceProjectSlug: 'my-city-life' },
      { name: 'Node.js' },
      { name: 'Express.js' },
      { name: 'Fastify', evidenceProjectSlug: 'devcollab' },
      { name: 'REST APIs' },
      { name: 'WebSockets' },
    ],
  },
  {
    name: 'Front end',
    skills: [
      { name: 'React' },
      { name: 'Next.js' },
      { name: 'React Native' },
      { name: 'Expo' },
      { name: 'TypeScript', evidenceProjectSlug: 'devcollab' },
      { name: 'JavaScript' },
      { name: 'HTML5' },
      { name: 'CSS3' },
      { name: 'Tailwind CSS' },
    ],
  },
  {
    name: 'Databases',
    skills: [
      { name: 'PostgreSQL', evidenceProjectSlug: 'devcollab' },
      { name: 'MySQL' },
      { name: 'MongoDB', evidenceProjectSlug: 'sprintly' },
      { name: 'Redis' },
    ],
  },
  {
    name: 'DevOps and tools',
    skills: [
      { name: 'Docker' },
      { name: 'Linux' },
      { name: 'Git' },
      { name: 'GitHub' },
      { name: 'CI/CD' },
      { name: 'Bash' },
      { name: 'Jira' },
      { name: 'Figma' },
    ],
  },
  {
    name: 'Practices',
    skills: [
      { name: 'Agile/Scrum' },
      { name: 'API design' },
      { name: 'real-time systems' },
      { name: 'secure data validation' },
      { name: 'caching' },
    ],
  },
];
