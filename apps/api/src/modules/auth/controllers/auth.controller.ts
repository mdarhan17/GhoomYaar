import type { RequestHandler } from 'express';
import { env } from '../../../config/env.js';
import { ApiError } from '../../../common/errors/ApiError.js';
import { registerSchema, loginSchema } from '../validators/auth.schema.js';
import { createSession, loginUser, registerUser, resolveUser } from '../services/auth.service.js';

const cookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  path: '/api/v1',
  maxAge: 2 * 60 * 60 * 1000,
};

export const register: RequestHandler = async (req, res) => {
  const input = registerSchema.parse(req.body);
  const user = await registerUser(input);
  res.cookie('gy_session', createSession(user.id), cookieOptions);
  res.status(201).json({ user });
};

export const login: RequestHandler = async (req, res) => {
  const input = loginSchema.parse(req.body);
  const user = await loginUser(input);
  res.cookie('gy_session', createSession(user.id), cookieOptions);
  res.json({ user });
};

export const me: RequestHandler = async (req, res) => {
  const token = req.cookies?.gy_session;
  if (typeof token !== 'string') throw new ApiError(401, 'Not authenticated');
  res.json({ user: await resolveUser(token) });
};

export const logout: RequestHandler = (_req, res) => {
  res.clearCookie('gy_session', { path: cookieOptions.path, sameSite: cookieOptions.sameSite, secure: cookieOptions.secure, httpOnly: true });
  res.status(204).send();
};