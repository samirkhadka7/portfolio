import type { Service } from '@/types';

export const services: Service[] = [
  {
    title: 'Web Development',
    description: 'Custom high-performance web applications built with modern frameworks.',
    icon: 'code',
    accent: 'primary',
  },
  {
    title: 'Database Design',
    description: 'Architecting scalable SQL and NoSQL schemas for data integrity and speed.',
    icon: 'schema',
    accent: 'secondary',
  },
  {
    title: 'Data Analysis',
    description:
      'Transforming raw data into actionable business intelligence through visualization.',
    icon: 'insights',
    accent: 'tertiary',
  },
  {
    title: 'ML Assistance',
    description: 'Implementing predictive models and automation to solve complex problems.',
    icon: 'model_training',
    accent: 'error',
  },
];
