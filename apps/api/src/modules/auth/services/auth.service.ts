import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../../../config/env.js';
import { ApiError } from '../../../common/errors/ApiError.js';
import { User } from '../../users/models/user.model.js';
import type { z } from 'zod';
import type { registerSchema, loginSchema } from '../validators/auth.schema.js';

export async function registerUser(data: z.infer<typeof registerSchema>) {
  const existing = await User.exists({ email: data.email });
  if (existing) throw new ApiError(409, 'Email is already registered');
  const passwordHash = await bcrypt.hash(data.password, 12);
  const user = await User.create({ name: data.name, email: data.email, passwordHash, role: 'traveller' });
  return { id: String(user._id), name: user.name, email: user.email, role: user.role };
}

export async function loginUser(data: z.infer<typeof loginSchema>) {
  const user = await User.findOne({ email: data.email }).select('+passwordHash');
  if (!user || !(await bcrypt.compare(data.password, user.passwordHash))) {
    throw new ApiError(401, 'Invalid email or password');
  }
  return { id: String(user._id), name: user.name, email: user.email, role: user.role };
}

export function createSession(userId: string): string {
  return jwt.sign({ sub: userId }, env.JWT_ACCESS_SECRET, { expiresIn: '2h', algorithm: 'HS256' });
}

export async function resolveUser(token: string) {
  let id: string;
  try {
    const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET, { algorithms: ['HS256'] });
    if (typeof decoded === 'string' || typeof decoded.sub !== 'string') throw new Error('Invalid token');
    id = decoded.sub;
  } catch {
    throw new ApiError(401, 'Not authenticated');
  }
  const user = await User.findById(id);
  if (!user) throw new ApiError(401, 'Not authenticated');
  return { id: String(user._id), name: user.name, email: user.email, role: user.role };
}