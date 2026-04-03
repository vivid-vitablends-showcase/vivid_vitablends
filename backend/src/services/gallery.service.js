import * as galleryRepository from '../repositories/gallery.repository.js';
import * as imageService from './image.service.js';
import logger from '../utils/logger.js';

export const getAll = async () => {
  logger.info('Fetching all gallery images');
  return galleryRepository.findAll();
};

export const create = async (data) => {
  logger.info('Adding gallery image', { title: data.title });
  if (data.image && data.image.startsWith('data:')) {
    data.image = await imageService.upload(data.image);
  }
  const item = await galleryRepository.create(data);
  logger.info('Gallery image added', { id: item.id });
  return item;
};

export const remove = async (id) => {
  logger.info('Removing gallery image', { id });
  const exists = await galleryRepository.findById(id);
  if (!exists) {
    throw Object.assign(new Error('Gallery image not found'), {
      statusCode: 404,
      code: 'NOT_FOUND',
    });
  }
  await galleryRepository.deleteById(id);
  logger.info('Gallery image removed', { id });
  return { message: 'Image removed successfully' };
};
