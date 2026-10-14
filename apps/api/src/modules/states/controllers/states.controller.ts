import type { RequestHandler } from 'express';
import { z } from 'zod';
import { listStates } from '../services/states.service.js';

const querySchema = z.object({ q: z.string().max(100).optional(), region: z.string().max(50).optional() });
export const getStates: RequestHandler = (req, res) => {
  const { q, region } = querySchema.parse(req.query);
  const data = listStates(q, region);
  res.json({ data, total: data.length });
};