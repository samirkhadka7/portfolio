import type { LanguageBreakdown, StatItem } from '@/types';

export const aboutStats: StatItem[] = [
  { label: 'Years Exp.', value: '3+', accent: 'primary' },
  { label: 'Projects Done', value: '15+', accent: 'primary' },
  { label: 'Tech Stacks', value: '5+', accent: 'primary' },
];

export const githubStats: StatItem[] = [
  { label: 'Total Contributions', value: '1.2k+', accent: 'primary' },
  { label: 'Repositories', value: '45', accent: 'secondary' },
];

export const topLanguages: LanguageBreakdown[] = [
  { name: 'TypeScript', percentage: 45, accent: 'primary' },
  { name: 'Python', percentage: 35, accent: 'secondary' },
  { name: 'SQL', percentage: 20, accent: 'tertiary' },
];
