import type { Project } from '@/types';

export const projects: Project[] = [
  {
    slug: 'educonnect-lms',
    title: 'EduConnect LMS',
    description:
      'A complete school management system with real-time analytics, automated attendance, and predictive grade modeling.',
    tags: ['Next.js', 'PostgreSQL'],
    image: 'https://picsum.photos/seed/educonnect/1200/800',
    accent: 'primary',
    size: 'main',
  },
  {
    slug: 'automated-etl',
    title: 'Automated ETL Pipeline',
    description:
      'Scalable Python-based pipeline processing millions of records from diverse APIs into a centralized data warehouse.',
    tags: ['Python', 'Airflow'],
    icon: 'account_tree',
    accent: 'tertiary',
    size: 'medium',
  },
  {
    slug: 'student-performance-predictor',
    title: 'Student Performance Predictor',
    description:
      'Regression model predicting student outcomes with 94% accuracy based on historical behavioral data.',
    tags: ['Scikit-Learn', 'Flask'],
    icon: 'psychology',
    accent: 'secondary',
    size: 'medium',
  },
  {
    slug: 'data-viz-dashboard',
    title: 'Data Viz Dashboard',
    description: 'Real-time crypto monitoring dashboard using D3.js and WebSockets.',
    tags: ['D3.js', 'WebSockets'],
    icon: 'bar_chart',
    accent: 'primary',
    size: 'small',
  },
  {
    slug: 'fullstack-analytics',
    title: 'Full Stack Analytics',
    description: 'E-commerce behavioral tracking engine built with Node.js and Redis.',
    tags: ['Node.js', 'Redis'],
    icon: 'analytics',
    accent: 'error',
    size: 'small',
  },
];
