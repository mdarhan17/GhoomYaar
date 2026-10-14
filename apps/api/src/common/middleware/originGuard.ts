import type { RequestHandler } from 'express';
import { env } from '../../config/env.js';
import { ApiError } from '../errors/ApiError.js';

// Browser mutations carry an Origin header; deny cross-origin requests.
// For publicly deployed APIs add a CSRF token strategy when using cross-site cookies.
export const originGuard: RequestHandler = (req, _res, next) => {
  if (!['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    const origin = req.get('origin');
    if (origin && origin !== env.CLIENT_ORIGIN) return next(new ApiError(403, 'Untrusted request origin'));
  }
  next();
};