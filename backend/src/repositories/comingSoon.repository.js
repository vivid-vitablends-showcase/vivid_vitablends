import prisma from '../utils/prisma.js';
import { clearCache } from '../middleware/cache.js';

export const findAll = async () => {
  return prisma.comingSoon.findMany({
    orderBy: { displayOrder: 'asc' },
  });
};

export const findById = async (id) => {
  return prisma.comingSoon.findUnique({ where: { id } });
};

export const create = async (data) => {
  const product = await prisma.comingSoon.create({ data });
  await clearCache('/api/coming-soon*');
  return product;
};

export const deleteById = async (id) => {
  await prisma.comingSoon.delete({ where: { id } });
  await clearCache('/api/coming-soon*');
};
