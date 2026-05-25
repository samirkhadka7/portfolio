import type { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { SkillCategory } from '../models/SkillCategory';

const categorySchema = z.object({
  key: z.string().min(1),
  title: z.string().min(1),
  icon: z.string().min(1),
  accent: z.enum(['primary', 'secondary', 'tertiary', 'error']),
  skills: z
    .array(
      z.object({
        name: z.string().min(1),
        level: z.number().min(0).max(100),
      }),
    )
    .default([]),
  order: z.number().optional().default(0),
});

export async function list(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const items = await SkillCategory.find().sort({ order: 1, createdAt: 1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
}

export async function getOne(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const item = await SkillCategory.findById(req.params.id);
    if (!item) {
      res.status(404).json({ error: 'Not found' });
      return;
    }
    res.json(item);
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = categorySchema.parse(req.body);
    const item = await SkillCategory.create(data);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = categorySchema.partial().parse(req.body);
    const item = await SkillCategory.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!item) {
      res.status(404).json({ error: 'Not found' });
      return;
    }
    res.json(item);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const item = await SkillCategory.findByIdAndDelete(req.params.id);
    if (!item) {
      res.status(404).json({ error: 'Not found' });
      return;
    }
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}
