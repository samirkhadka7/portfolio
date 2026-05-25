import type { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { SiteConfig } from '../models/SiteConfig';

const accentEnum = z.enum(['primary', 'secondary', 'tertiary', 'error']);

const statSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
  accent: accentEnum,
});

const languageSchema = z.object({
  name: z.string().min(1),
  percentage: z.number().min(0).max(100),
  accent: accentEnum,
});

const navLinkSchema = z.object({
  href: z.string().min(1),
  label: z.string().min(1),
});

const siteSchema = z.object({
  name: z.string().min(1),
  brand: z.string().min(1),
  tagline: z.string().min(1),
  description: z.string().min(1),
  location: z.string().optional().default(''),
  status: z.string().optional().default(''),
  email: z.string().email(),
  resumeUrl: z.string().optional().default('#'),
  avatar: z.string().optional().default(''),
  socials: z
    .object({
      twitter: z.string().optional().default('#'),
      github: z.string().optional().default('#'),
      linkedin: z.string().optional().default('#'),
    })
    .optional(),
  terminalPhrases: z.array(z.string()).default([]),
  navLinks: z.array(navLinkSchema).default([]),
  aboutStats: z.array(statSchema).default([]),
  githubStats: z.array(statSchema).default([]),
  topLanguages: z.array(languageSchema).default([]),
});

export async function get(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const config = await SiteConfig.findOne({ singletonKey: 'site' });
    res.json(config);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = siteSchema.partial().parse(req.body);
    const config = await SiteConfig.findOneAndUpdate({ singletonKey: 'site' }, data, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    });
    res.json(config);
  } catch (err) {
    next(err);
  }
}
