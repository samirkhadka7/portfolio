import { connectDB, disconnectDB } from '../config/db';
import { Project } from '../models/Project';
import { SkillCategory } from '../models/SkillCategory';
import { Service } from '../models/Service';
import { TimelineEntry } from '../models/TimelineEntry';
import { HelpItem } from '../models/HelpItem';
import { SiteConfig } from '../models/SiteConfig';

const SITE = {
  singletonKey: 'site',
  name: 'Samir Khadka',
  brand: 'Samir Khadka',
  tagline: 'Full Stack & Data Engineering Portfolio',
  description:
    'Part-time Full Stack Developer & Data Engineer. Building scalable web applications, data-driven systems, and machine learning solutions.',
  location: 'Kathmandu, Nepal',
  status: 'Seeking Data Engineering challenges',
  email: 'hello@samirkhadka.dev',
  resumeUrl: '#',
  avatar: 'https://picsum.photos/seed/samir-avatar/400/400',
  socials: { twitter: '#', github: '#', linkedin: '#' },
  terminalPhrases: [
    'Initializing environment...',
    'Loading Tech Stack...',
    'Establishing Data Pipeline...',
    'Compiling Frontend Components...',
    'Connecting Database Clusters...',
    'Ready for deployment.',
  ],
  navLinks: [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#services', label: 'Services' },
    { href: '#contact', label: 'Contact' },
  ],
  aboutStats: [
    { label: 'Years Exp.', value: '3+', accent: 'primary' },
    { label: 'Projects Done', value: '15+', accent: 'primary' },
    { label: 'Tech Stacks', value: '5+', accent: 'primary' },
  ],
  githubStats: [
    { label: 'Total Contributions', value: '1.2k+', accent: 'primary' },
    { label: 'Repositories', value: '45', accent: 'secondary' },
  ],
  topLanguages: [
    { name: 'TypeScript', percentage: 45, accent: 'primary' },
    { name: 'Python', percentage: 35, accent: 'secondary' },
    { name: 'SQL', percentage: 20, accent: 'tertiary' },
  ],
};

const SKILLS = [
  {
    key: 'frontend',
    title: 'Frontend',
    icon: 'dashboard',
    accent: 'primary',
    order: 0,
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
    order: 1,
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
    order: 2,
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
    order: 3,
    skills: [
      { name: 'Pandas / Scikit-Learn', level: 70 },
      { name: 'PowerBI / SQL ETL', level: 75 },
    ],
  },
];

const PROJECTS = [
  {
    slug: 'educonnect-lms',
    title: 'EduConnect LMS',
    description:
      'A complete school management system with real-time analytics, automated attendance, and predictive grade modeling.',
    tags: ['Next.js', 'PostgreSQL'],
    image: 'https://picsum.photos/seed/educonnect/1200/800',
    accent: 'primary',
    size: 'main',
    order: 0,
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
    order: 1,
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
    order: 2,
  },
  {
    slug: 'data-viz-dashboard',
    title: 'Data Viz Dashboard',
    description: 'Real-time crypto monitoring dashboard using D3.js and WebSockets.',
    tags: ['D3.js', 'WebSockets'],
    icon: 'bar_chart',
    accent: 'primary',
    size: 'small',
    order: 3,
  },
  {
    slug: 'fullstack-analytics',
    title: 'Full Stack Analytics',
    description: 'E-commerce behavioral tracking engine built with Node.js and Redis.',
    tags: ['Node.js', 'Redis'],
    icon: 'analytics',
    accent: 'error',
    size: 'small',
    order: 4,
  },
];

const SERVICES = [
  {
    title: 'Web Development',
    description: 'Custom high-performance web applications built with modern frameworks.',
    icon: 'code',
    accent: 'primary',
    order: 0,
  },
  {
    title: 'Database Design',
    description: 'Architecting scalable SQL and NoSQL schemas for data integrity and speed.',
    icon: 'schema',
    accent: 'secondary',
    order: 1,
  },
  {
    title: 'Data Analysis',
    description:
      'Transforming raw data into actionable business intelligence through visualization.',
    icon: 'insights',
    accent: 'tertiary',
    order: 2,
  },
  {
    title: 'ML Assistance',
    description: 'Implementing predictive models and automation to solve complex problems.',
    icon: 'model_training',
    accent: 'error',
    order: 3,
  },
];

const TIMELINE = [
  {
    period: '2024 - Present',
    title: 'Specializing in Data Engineering',
    description:
      'Mastering Apache Spark, Airflow, and Cloud Data Warehousing (Snowflake/BigQuery).',
    accent: 'primary',
    order: 0,
  },
  {
    period: '2022 - 2023',
    title: 'Full Stack Professional',
    description: 'Worked on high-load production apps with MERN stack and Next.js.',
    accent: 'secondary',
    order: 1,
  },
  {
    period: '2020 - 2021',
    title: 'CS Foundations & ML Basics',
    description: 'Started journey with Python, Data Structures, and linear regression models.',
    accent: 'muted',
    order: 2,
  },
];

const HELP_ITEMS = [
  {
    title: 'Complex Full Stack Applications',
    description:
      'From zero to deployment — building high-performance web systems with scalable backend support.',
    image: 'https://picsum.photos/seed/fullstack-help/1200/600',
    accent: 'primary',
    span: 8,
    order: 0,
  },
  {
    title: 'Data Dashboards',
    description: 'Real-time data visualization for actionable business metrics.',
    icon: 'analytics',
    accent: 'secondary',
    span: 4,
    order: 1,
  },
  {
    title: 'Technical Documentation',
    description: 'Exhaustive SQL docs and architecture reports for growing teams.',
    icon: 'description',
    accent: 'tertiary',
    span: 4,
    order: 2,
  },
  {
    title: 'ML Prediction Systems',
    description: 'Integrating AI models into production workflows for smart automation.',
    image: 'https://picsum.photos/seed/ml-help/1200/600',
    accent: 'error',
    span: 8,
    order: 3,
  },
];

async function seed() {
  console.log('Connecting to DB...');
  await connectDB();

  console.log('Clearing existing data...');
  await Promise.all([
    Project.deleteMany({}),
    SkillCategory.deleteMany({}),
    Service.deleteMany({}),
    TimelineEntry.deleteMany({}),
    HelpItem.deleteMany({}),
    SiteConfig.deleteMany({}),
  ]);

  console.log('Inserting fresh data...');
  await Promise.all([
    Project.insertMany(PROJECTS),
    SkillCategory.insertMany(SKILLS),
    Service.insertMany(SERVICES),
    TimelineEntry.insertMany(TIMELINE),
    HelpItem.insertMany(HELP_ITEMS),
    SiteConfig.create(SITE),
  ]);

  console.log('Seed complete.');
  await disconnectDB();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
