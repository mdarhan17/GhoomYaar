import { Router } from 'express';
import { rateLimit } from 'express-rate-limit';
import { login, logout, me, register } from '../controllers/auth.controller.js';

const router = Router();
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 15, standardHeaders: 'draft-8', legacyHeaders: false });
router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);
router.get('/me', me);
router.post('/logout', logout);
export default router;