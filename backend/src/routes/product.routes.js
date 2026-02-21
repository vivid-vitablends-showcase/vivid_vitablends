import express from 'express';
import * as productController from '../controllers/product.controller.js';
import { cache } from '../middleware/cache.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/featured', cache(300), productController.getFeatured);
router.get('/combos', cache(300), productController.getCombos);
router.get('/:id', cache(600), productController.getById);
router.get('/', cache(300), productController.getAll);
router.post('/', authenticate, productController.create);
router.put('/:id', authenticate, productController.update);
router.delete('/:id', authenticate, productController.deleteProduct);

export default router;
