import * as reviewRepository from '../repositories/review.repository.js';
import logger from '../utils/logger.js';

export const getAll = async (filters) => {
  if (filters.limit && (isNaN(filters.limit) || parseInt(filters.limit) <= 0)) {
    logger.warn('Invalid limit parameter', { limit: filters.limit });
    const error = new Error('Limit must be a positive integer');
    error.statusCode = 400;
    error.code = 'INVALID_LIMIT';
    throw error;
  }

  logger.info('Fetching reviews', { filters });
  return reviewRepository.findAll(filters);
};
