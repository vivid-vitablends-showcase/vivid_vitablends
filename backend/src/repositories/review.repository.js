import prisma from '../utils/prisma.js';

export const findAll = async (filters = {}) => {
  const where = {};
  if (filters.showInHero !== undefined)
    where.showInHero = filters.showInHero === 'true';

  const options = { where, orderBy: { createdAt: 'desc' } };
  if (filters.limit) options.take = parseInt(filters.limit);

  return prisma.review.findMany(options);
};

export const create = async (data) => {
  return prisma.review.create({ data });
};

export const findHeroReviews = async () => {
  return prisma.review.findMany({
    where: { showInHero: true },
    orderBy: { createdAt: 'desc' },
  });
};

export const updateShowInHero = async (id, showInHero) => {
  return prisma.review.update({ where: { id }, data: { showInHero } });
};
