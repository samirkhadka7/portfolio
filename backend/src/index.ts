import express, { type Express } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env';
import { connectDB } from './config/db';
import { errorHandler, notFoundHandler } from './middleware/error';
import { apiLimiter } from './middleware/rateLimit';
import authRouter from './routes/auth';
import projectsRouter from './routes/projects';
import skillsRouter from './routes/skills';
import servicesRouter from './routes/services';
import timelineRouter from './routes/timeline';
import helpRouter from './routes/help';
import siteRouter from './routes/site';
import contactRouter from './routes/contact';
import uploadRouter from './routes/upload';

const app: Express = express();

// Trust one hop of proxy (Render, Heroku, etc.) so rate-limit-by-IP works correctly
// and secure cookies survive HTTPS termination at the proxy.
app.set('trust proxy', 1);

// Security headers (CSP, HSTS, X-Content-Type-Options, X-Frame-Options, etc.)
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  }),
);

app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', env: env.NODE_ENV });
});

// Global API rate limit (500 req / 15 min / IP)
app.use('/api', apiLimiter);

app.use('/api/auth', authRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/skills', skillsRouter);
app.use('/api/services', servicesRouter);
app.use('/api/timeline', timelineRouter);
app.use('/api/help', helpRouter);
app.use('/api/site', siteRouter);
app.use('/api/contact', contactRouter);
app.use('/api/upload', uploadRouter);

app.use(notFoundHandler);
app.use(errorHandler);

async function start() {
  await connectDB();
  app.listen(env.PORT, () => {
    console.log(`Server running on http://localhost:${env.PORT} (${env.NODE_ENV})`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
