import type { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { Project } from '../models/Project';

const projectSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  tags: z.array(z.string()).default([]),
  image: z.string().optional().default(''),
  icon: z.string().optional().default(''),
  accent: z.enum(['primary', 'secondary', 'tertiary', 'error']),
  size: z.enum(['main', 'medium', 'small']),
  link: z.string().optional().default(''),
  order: z.number().optional().default(0),
});

export async function list(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const items = await Project.find().sort({ order: 1, createdAt: 1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
}

export async function getOne(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const item = await Project.findById(req.params.id);
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
    const data = projectSchema.parse(req.body);
    const item = await Project.create(data);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = projectSchema.partial().parse(req.body);
    const item = await Project.findByIdAndUpdate(req.params.id, data, { new: true });
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
    const item = await Project.findByIdAndDelete(req.params.id);
    if (!item) {
      res.status(404).json({ error: 'Not found' });
      return;
    }
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}
