import type { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { ContactMessage } from '../models/ContactMessage';

const contactSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  service: z.string().optional().default(''),
  message: z.string().min(1).max(5000),
});

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = contactSchema.parse(req.body);
    const item = await ContactMessage.create(data);
    res.status(201).json({ ok: true, id: item._id });
  } catch (err) {
    next(err);
  }
}

export async function list(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const items = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
}

export async function markRead(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const item = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true },
    );
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
    const item = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!item) {
      res.status(404).json({ error: 'Not found' });
      return;
    }
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}
