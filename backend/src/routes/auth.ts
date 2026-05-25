import { Router } from 'express';
import { requireAuth } from '../middleware/auth';
import { loginLimiter } from '../middleware/rateLimit';
import { login, logout, me } from '../controllers/authController';

const router = Router();

router.post('/login', loginLimiter, login);
router.post('/logout', logout);
router.get('/me', requireAuth, me);

export default router;
