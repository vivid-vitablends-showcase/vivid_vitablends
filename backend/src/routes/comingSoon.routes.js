import express from 'express';
import * as comingSoonController from '../controllers/comingSoon.controller.js';
import { cache } from '../middleware/cache.js';
import { authenticate } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/adminAuth.js';
import { validate } from '../middleware/validate.js';
import { comingSoonUpdateSchema } from '../schemas/comingSoon.schema.js';

const router = express.Router();

router.get('/', cache(300), comingSoonController.getAll);
router.put(
  '/',
  authenticate,
  requireAdmin,
  validate(comingSoonUpdateSchema),
  comingSoonController.addOrRemove
);

export default router;
