import express from 'express';
import * as reviewController from '../controllers/review.controller.js';

const router = express.Router();

router.get('/', reviewController.getAll);

export default router;
