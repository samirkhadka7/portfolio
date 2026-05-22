import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export interface JwtPayload {
  sub: string;
  role: 'admin';
}

declare module 'express-serve-static-core' {
  interface Request {
    auth?: JwtPayload;
  }
}

export function signAdminToken(): string {
  const payload: JwtPayload = { sub: env.ADMIN_EMAIL, role: 'admin' };
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: '7d' });
}

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const headerToken = req.headers.authorization?.startsWith('Bearer ')
    ? req.headers.authorization.slice(7)
    : undefined;
  const cookieToken = (req as Request & { cookies?: Record<string, string> }).cookies?.token;
  const token = headerToken ?? cookieToken;

  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    if (decoded.role !== 'admin') {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }
    req.auth = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}
