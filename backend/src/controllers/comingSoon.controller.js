import * as comingSoonService from '../services/comingSoon.service.js';
import logger from '../utils/logger.js';

export const getAll = async (req, res, next) => {
  try {
    logger.info('Fetching all coming soon products');
    const products = await comingSoonService.getAll();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    next(error);
  }
};

export const addOrRemove = async (req, res, next) => {
  try {
    logger.info('Add or remove coming soon product request', {
      hasId: !!req.body.id,
    });
    const result = await comingSoonService.addOrRemove(req.body);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
