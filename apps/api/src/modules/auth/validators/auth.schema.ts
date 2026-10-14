import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.email().max(254).transform(value => value.toLowerCase()),
  password: z.string().min(10).max(72),
}).strict();

export const loginSchema = z.object({
  email: z.email().transform(value => value.toLowerCase()),
  password: z.string().min(1),
}).strict();