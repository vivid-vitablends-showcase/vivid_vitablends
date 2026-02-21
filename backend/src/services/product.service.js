import * as productRepository from '../repositories/product.repository.js';
import logger from '../utils/logger.js';

export const getFeatured = async () => {
  logger.info('Fetching featured products');
  return productRepository.findFeatured();
};

export const getAll = async (filters) => {
  logger.info('Fetching all products', { filters });
  return productRepository.findAll(filters);
};

export const getCombos = async () => {
  logger.info('Fetching combo products');
  return productRepository.findByCategory('combo');
};

export const getById = async (id) => {
  if (!id || typeof id !== 'string' || id.trim() === '') {
    logger.warn('Invalid product ID provided', { id });
    const error = new Error('Invalid product ID');
    error.statusCode = 400;
    error.code = 'INVALID_PRODUCT_ID';
    throw error;
  }

  logger.info('Fetching product by ID', { productId: id });
  const product = await productRepository.findById(id);
  
  if (!product) {
    logger.warn('Product not found', { productId: id });
    const error = new Error('Product not found');
    error.statusCode = 404;
    error.code = 'PRODUCT_NOT_FOUND';
    throw error;
  }
  
  return product;
};
