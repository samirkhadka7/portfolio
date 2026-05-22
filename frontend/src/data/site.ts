import type { SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
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
  socials: {
    twitter: '#',
    github: '#',
    linkedin: '#',
  },
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
