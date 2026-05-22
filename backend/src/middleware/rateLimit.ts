import rateLimit from 'express-rate-limit';

const minute = 60 * 1000;

export const loginLimiter = rateLimit({
  windowMs: 15 * minute,
  max: 5,
  message: { error: 'Too many login attempts. Try again in 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

export const contactLimiter = rateLimit({
  windowMs: 60 * minute,
  max: 5,
  message: { error: 'Too many contact submissions. Try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

export const apiLimiter = rateLimit({
  windowMs: 15 * minute,
  max: 500,
  message: { error: 'Too many requests. Slow down.' },
  standardHeaders: true,
  legacyHeaders: false,
});
