import { siteConfig as fallbackSite } from '@/data/site';
import { projects as fallbackProjects } from '@/data/projects';
import { skillCategories as fallbackSkills } from '@/data/skills';
import { services as fallbackServices } from '@/data/services';
import { timeline as fallbackTimeline } from '@/data/timeline';
import { helpItems as fallbackHelp } from '@/data/help';
import type {
  HelpItem,
  Project,
  Service,
  SiteConfig,
  SkillCategory,
  TimelineEntry,
} from '@/types';
import { API_URL } from './api';

async function fetchJson<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

function pick<T>(remote: T[] | null, fallback: T[]): T[] {
  return remote && remote.length > 0 ? remote : fallback;
}

export async function fetchSiteOnly(): Promise<SiteConfig> {
  const site = await fetchJson<SiteConfig>('/api/site');
  return site ?? fallbackSite;
}

export async function fetchSiteContent() {
  const [site, projects, skills, services, timeline, help] = await Promise.all([
    fetchJson<SiteConfig>('/api/site'),
    fetchJson<Project[]>('/api/projects'),
    fetchJson<SkillCategory[]>('/api/skills'),
    fetchJson<Service[]>('/api/services'),
    fetchJson<TimelineEntry[]>('/api/timeline'),
    fetchJson<HelpItem[]>('/api/help'),
  ]);

  return {
    site: site ?? fallbackSite,
    projects: pick(projects, fallbackProjects),
    skills: pick(skills, fallbackSkills),
    services: pick(services, fallbackServices),
    timeline: pick(timeline, fallbackTimeline),
    help: pick(help, fallbackHelp),
  };
}

export type SiteContent = Awaited<ReturnType<typeof fetchSiteContent>>;
