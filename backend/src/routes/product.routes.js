import express from 'express';
import * as productController from '../controllers/product.controller.js';

const router = express.Router();

router.get('/featured', productController.getFeatured);
router.get('/combos', productController.getCombos);
router.get('/:id', productController.getById);
router.get('/', productController.getAll);

export default router;
