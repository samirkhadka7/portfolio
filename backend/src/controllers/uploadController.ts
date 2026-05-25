import type { NextFunction, Request, Response } from 'express';
import { uploadBufferToCloudinary } from '../middleware/upload';

export async function uploadImage(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }
    const result = await uploadBufferToCloudinary(req.file.buffer);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}
