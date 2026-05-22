import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { env, isProd } from '../config/env';
import { signAdminToken } from '../middleware/auth';
import { loginLimiter } from '../middleware/rateLimit';

const router = Router();

// Pre-hash admin password once at module load (constant-time comparison via bcrypt)
const ADMIN_HASH = bcrypt.hashSync(env.ADMIN_PASSWORD, 10);

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

router.post('/login', loginLimiter, async (req, res, next) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const emailOk = email === env.ADMIN_EMAIL;
    const passwordOk = await bcrypt.compare(password, ADMIN_HASH);

    if (!emailOk || !passwordOk) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const token = signAdminToken();

    res.cookie('token', token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ ok: true, token });
  } catch (err) {
    next(err);
  }
});

router.post('/logout', (_req, res) => {
  res.clearCookie('token');
  res.json({ ok: true });
});

router.get('/me', (req, res) => {
  const token = (req as typeof req & { cookies?: Record<string, string> }).cookies?.token;
  res.json({ authenticated: Boolean(token) });
});

export default router;
