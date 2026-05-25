import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { contactLimiter } from '../middleware/rateLimit';
import * as controller from '../controllers/contactController';

const router = Router();

router.post('/', contactLimiter, controller.create);
router.get('/', requireAuth, controller.list);
router.patch('/:id/read', requireAuth, controller.markRead);
router.delete('/:id', requireAuth, controller.remove);

export default router;
