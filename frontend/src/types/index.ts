export type SkillCategoryKey = 'frontend' | 'backend' | 'database' | 'data-ml';

export type AccentColor = 'primary' | 'secondary' | 'tertiary' | 'error';

export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  key: SkillCategoryKey;
  title: string;
  icon: string;
  accent: AccentColor;
  skills: Skill[];
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  image?: string;
  icon?: string;
  accent: AccentColor;
  size: 'main' | 'medium' | 'small';
  link?: string;
}

export interface Service {
  title: string;
  description: string;
  icon: string;
  accent: AccentColor;
}

export interface TimelineEntry {
  period: string;
  title: string;
  description: string;
  accent: AccentColor | 'muted';
}

export interface StatItem {
  label: string;
  value: string;
  accent: AccentColor;
}

export interface LanguageBreakdown {
  name: string;
  percentage: number;
  accent: AccentColor;
}

export interface HelpItem {
  title: string;
  description: string;
  image?: string;
  icon?: string;
  accent: AccentColor;
  span: 8 | 4;
}

export interface NavLink {
  href: string;
  label: string;
}

export interface Socials {
  twitter: string;
  github: string;
  linkedin: string;
}

export interface SiteConfig {
  name: string;
  brand: string;
  tagline: string;
  description: string;
  location: string;
  status: string;
  email: string;
  resumeUrl: string;
  avatar: string;
  socials: Socials;
  terminalPhrases: string[];
  navLinks: NavLink[];
  aboutStats: StatItem[];
  githubStats: StatItem[];
  topLanguages: LanguageBreakdown[];
}
