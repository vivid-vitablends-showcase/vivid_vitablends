import * as comingSoonRepository from '../repositories/comingSoon.repository.js';
import * as imageService from './image.service.js';
import logger from '../utils/logger.js';

export const getAll = async () => {
  logger.info('Fetching all coming soon products');
  return comingSoonRepository.findAll();
};

export const addOrRemove = async (data) => {
  if (data.id) {
    logger.info('Removing coming soon product', { id: data.id });
    const exists = await comingSoonRepository.findById(data.id);
    if (!exists) {
      throw Object.assign(new Error('Coming soon product not found'), {
        statusCode: 404,
        code: 'NOT_FOUND',
      });
    }
    await comingSoonRepository.deleteById(data.id);
    logger.info('Coming soon product removed', { id: data.id });
    return { message: 'Product removed successfully' };
  }

  logger.info('Adding coming soon product', { name: data.name });
  if (data.image && data.image.startsWith('data:')) {
    data.image = await imageService.upload(data.image);
  }
  const product = await comingSoonRepository.create(data);
  logger.info('Coming soon product added', { id: product.id });
  return product;
};
