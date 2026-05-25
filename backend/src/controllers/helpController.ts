import type { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { HelpItem } from '../models/HelpItem';

const helpItemSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  image: z.string().optional().default(''),
  icon: z.string().optional().default(''),
  accent: z.enum(['primary', 'secondary', 'tertiary', 'error']),
  span: z.union([z.literal(4), z.literal(8)]),
  order: z.number().optional().default(0),
});

export async function list(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const items = await HelpItem.find().sort({ order: 1, createdAt: 1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
}

export async function getOne(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const item = await HelpItem.findById(req.params.id);
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
    const data = helpItemSchema.parse(req.body);
    const item = await HelpItem.create(data);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = helpItemSchema.partial().parse(req.body);
    const item = await HelpItem.findByIdAndUpdate(req.params.id, data, { new: true });
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
    const item = await HelpItem.findByIdAndDelete(req.params.id);
    if (!item) {
      res.status(404).json({ error: 'Not found' });
      return;
    }
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}
