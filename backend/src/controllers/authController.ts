import type { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { env, isProd } from '../config/env';
import { signAdminToken } from '../middleware/auth';

// Pre-hash admin password once at module load (constant-time comparison via bcrypt)
const ADMIN_HASH = bcrypt.hashSync(env.ADMIN_PASSWORD, 10);

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
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
}

export function logout(_req: Request, res: Response): void {
  res.clearCookie('token');
  res.json({ ok: true });
}

// Returns 200 only with a valid token (route wires requireAuth), 401 otherwise.
export function me(req: Request, res: Response): void {
  res.json({ authenticated: true, email: req.auth?.sub });
}
