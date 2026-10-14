import { Router } from 'express';
import { getStates } from '../controllers/states.controller.js';
const router = Router();
router.get('/', getStates);
export default router;