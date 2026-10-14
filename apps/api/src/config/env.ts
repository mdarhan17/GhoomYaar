import 'dotenv/config';
import { z } from 'zod';

const schema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().min(1).max(65535).default(5000),
  CLIENT_ORIGIN: z.string().url(),
  MONGODB_URI: z.string().min(10),
  JWT_ACCESS_SECRET: z.string().min(32),
});

const result = schema.safeParse(process.env);
if (!result.success) {
  throw new Error('Invalid API configuration: ' + result.error.issues.map(x => x.path.join('.')).join(', '));
}
export const env = result.data;