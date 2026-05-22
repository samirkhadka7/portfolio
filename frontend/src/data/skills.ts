import type { SkillCategory } from '@/types';

export const skillCategories: SkillCategory[] = [
  {
    key: 'frontend',
    title: 'Frontend',
    icon: 'dashboard',
    accent: 'primary',
    skills: [
      { name: 'React / Next.js', level: 90 },
      { name: 'Tailwind CSS', level: 95 },
    ],
  },
  {
    key: 'backend',
    title: 'Backend',
    icon: 'terminal',
    accent: 'secondary',
    skills: [
      { name: 'Node.js / Express', level: 85 },
      { name: 'Python / Django', level: 80 },
    ],
  },
  {
    key: 'database',
    title: 'Database',
    icon: 'database',
    accent: 'tertiary',
    skills: [
      { name: 'PostgreSQL / MySQL', level: 88 },
      { name: 'MongoDB / Redis', level: 75 },
    ],
  },
  {
    key: 'data-ml',
    title: 'Data & ML',
    icon: 'analytics',
    accent: 'error',
    skills: [
      { name: 'Pandas / Scikit-Learn', level: 70 },
      { name: 'PowerBI / SQL ETL', level: 75 },
    ],
  },
];
