import { Router } from 'express';
import { z } from 'zod';
import { SkillCategory } from '../models/SkillCategory';
import { requireAuth } from '../middleware/auth';

const router = Router();

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

router.get('/', async (_req, res, next) => {
  try {
    const items = await SkillCategory.find().sort({ order: 1, createdAt: 1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
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
});

router.post('/', requireAuth, async (req, res, next) => {
  try {
    const data = categorySchema.parse(req.body);
    const item = await SkillCategory.create(data);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', requireAuth, async (req, res, next) => {
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
});

router.delete('/:id', requireAuth, async (req, res, next) => {
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
});

export default router;
