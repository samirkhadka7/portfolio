import type { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { TimelineEntry } from '../models/TimelineEntry';

const entrySchema = z.object({
  period: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  accent: z.enum(['primary', 'secondary', 'tertiary', 'error', 'muted']),
  order: z.number().optional().default(0),
});

export async function list(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const items = await TimelineEntry.find().sort({ order: 1, createdAt: 1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
}

export async function getOne(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const item = await TimelineEntry.findById(req.params.id);
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
    const data = entrySchema.parse(req.body);
    const item = await TimelineEntry.create(data);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = entrySchema.partial().parse(req.body);
    const item = await TimelineEntry.findByIdAndUpdate(req.params.id, data, { new: true });
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
    const item = await TimelineEntry.findByIdAndDelete(req.params.id);
    if (!item) {
      res.status(404).json({ error: 'Not found' });
      return;
    }
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}
