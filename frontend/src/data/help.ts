import type { HelpItem } from '@/types';

export const helpItems: HelpItem[] = [
  {
    title: 'Complex Full Stack Applications',
    description:
      'From zero to deployment — building high-performance web systems with scalable backend support.',
    image: 'https://picsum.photos/seed/fullstack-help/1200/600',
    accent: 'primary',
    span: 8,
  },
  {
    title: 'Data Dashboards',
    description: 'Real-time data visualization for actionable business metrics.',
    icon: 'analytics',
    accent: 'secondary',
    span: 4,
  },
  {
    title: 'Technical Documentation',
    description: 'Exhaustive SQL docs and architecture reports for growing teams.',
    icon: 'description',
    accent: 'tertiary',
    span: 4,
  },
  {
    title: 'ML Prediction Systems',
    description: 'Integrating AI models into production workflows for smart automation.',
    image: 'https://picsum.photos/seed/ml-help/1200/600',
    accent: 'error',
    span: 8,
  },
];
