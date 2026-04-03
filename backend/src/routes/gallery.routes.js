import express from 'express';
import * as galleryController from '../controllers/gallery.controller.js';
import { cache } from '../middleware/cache.js';
import { authenticate } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/adminAuth.js';
import { validate, validateId } from '../middleware/validate.js';
import { galleryCreateSchema } from '../schemas/gallery.schema.js';

const router = express.Router();

router.get('/', cache(300), galleryController.getAll);
router.post(
  '/',
  authenticate,
  requireAdmin,
  validate(galleryCreateSchema),
  galleryController.create
);
router.delete(
  '/:id',
  authenticate,
  requireAdmin,
  validateId,
  galleryController.remove
);

export default router;
