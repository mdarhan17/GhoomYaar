import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { rateLimit } from 'express-rate-limit';
import { env } from './config/env.js';
import { notFound, errorHandler } from './common/middleware/errorHandler.js';
import { originGuard } from './common/middleware/originGuard.js';
import authRoutes from './modules/auth/routes/auth.routes.js';
import statesRoutes from './modules/states/routes/states.routes.js';

export function createApp() {
  const app = express();
  app.disable('x-powered-by');
  app.use(helmet());
  app.use(cors({ origin: env.CLIENT_ORIGIN, credentials: true }));
  app.use(express.json({ limit: '100kb' }));
  app.use(cookieParser());
  app.use(originGuard);
  app.use('/api/', rateLimit({ windowMs: 15 * 60 * 1000, limit: 500, standardHeaders: 'draft-8', legacyHeaders: false }));
  app.get('/api/v1/health', (_req, res) => res.json({ status: 'ok', service: 'ghoomyaar-api' }));
  app.use('/api/v1/auth', authRoutes);
  app.use('/api/v1/states', statesRoutes);
  app.use(notFound);
  app.use(errorHandler);
  return app;
}