import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { upload, uploadBufferToCloudinary } from '../middleware/upload';

const router = Router();

router.post('/', requireAuth, upload.single('file'), async (req, res, next) => {
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
});

export default router;
