import { Router } from 'express';
import { z } from 'zod';
import { HelpItem } from '../models/HelpItem';
import { requireAuth } from '../middleware/auth';

const router = Router();

const helpItemSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  image: z.string().optional().default(''),
  icon: z.string().optional().default(''),
  accent: z.enum(['primary', 'secondary', 'tertiary', 'error']),
  span: z.union([z.literal(4), z.literal(8)]),
  order: z.number().optional().default(0),
});

router.get('/', async (_req, res, next) => {
  try {
    const items = await HelpItem.find().sort({ order: 1, createdAt: 1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
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
});

router.post('/', requireAuth, async (req, res, next) => {
  try {
    const data = helpItemSchema.parse(req.body);
    const item = await HelpItem.create(data);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', requireAuth, async (req, res, next) => {
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
});

router.delete('/:id', requireAuth, async (req, res, next) => {
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
});

export default router;
