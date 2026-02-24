import express from 'express';
import * as reviewController from '../controllers/review.controller.js';
import { cache } from '../middleware/cache.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', cache(300), reviewController.getAll);
router.get('/hero', cache(300), reviewController.getHeroReviews);
router.post('/', reviewController.create);
router.patch(
  '/:id/show-in-hero',
  authenticate,
  reviewController.updateShowInHero
);

export default router;
