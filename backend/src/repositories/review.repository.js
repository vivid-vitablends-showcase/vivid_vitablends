import prisma from '../utils/prisma.js';

export const findAll = async (filters = {}) => {
  const where = {};
  if (filters.showInHero !== undefined) where.showInHero = filters.showInHero === 'true';
  
  const options = { where };
  if (filters.limit) options.take = parseInt(filters.limit);
  
  return prisma.review.findMany(options);
};
