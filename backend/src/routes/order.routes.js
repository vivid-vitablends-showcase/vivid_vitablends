import express from 'express';
import * as orderController from '../controllers/order.controller.js';
import rateLimiter from '../middleware/rateLimiter.js';
import { authenticate } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/adminAuth.js';

const router = express.Router();

router.post(
  '/',
  rateLimiter({ windowMs: 60000, max: 10 }),
  orderController.create
);

router.get('/', authenticate, requireAdmin, orderController.getAll);

export default router;
