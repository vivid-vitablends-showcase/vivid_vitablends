import * as galleryService from '../services/gallery.service.js';
import logger from '../utils/logger.js';

export const getAll = async (req, res, next) => {
  try {
    logger.info('Fetching gallery images');
    const items = await galleryService.getAll();
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    logger.info('Creating gallery image');
    const item = await galleryService.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    logger.info('Removing gallery image', { id: req.params.id });
    const result = await galleryService.remove(req.params.id);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
