import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import * as controller from '../controllers/siteController';

const router = Router();

router.get('/', controller.get);
router.put('/', requireAuth, controller.update);

export default router;
