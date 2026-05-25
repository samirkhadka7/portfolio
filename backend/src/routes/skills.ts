import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import * as controller from '../controllers/skillController';

const router = Router();

router.get('/', controller.list);
router.get('/:id', controller.getOne);
router.post('/', requireAuth, controller.create);
router.put('/:id', requireAuth, controller.update);
router.delete('/:id', requireAuth, controller.remove);

export default router;
