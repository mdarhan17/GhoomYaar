import type { ErrorRequestHandler, RequestHandler } from 'express';
import { ZodError } from 'zod';
import { ApiError } from '../errors/ApiError.js';

export const notFound: RequestHandler = (_req, _res, next) => next(new ApiError(404, 'Endpoint not found'));

export const errorHandler: ErrorRequestHandler = (error: unknown, _req, res, next) => {
  if (res.headersSent) return next(error);
  if (error instanceof ZodError) {
    res.status(400).json({ message: 'Invalid input', issues: error.issues.map(issue => ({ field: issue.path.join('.'), message: issue.message })) });
    return;
  }
  if (error instanceof ApiError) {
    res.status(error.statusCode).json({ message: error.message });
    return;
  }
  if (typeof error === 'object' && error !== null && 'code' in error && error.code === 11000) {
    res.status(409).json({ message: 'An account with these details already exists' });
    return;
  }
  console.error('[api] Unhandled error', error);
  res.status(500).json({ message: 'Unexpected server error' });
};