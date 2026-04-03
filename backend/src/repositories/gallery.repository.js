import prisma from '../utils/prisma.js';
import { clearCache } from '../middleware/cache.js';

export const findAll = async () => {
  return prisma.galleryImage.findMany({ orderBy: { displayOrder: 'asc' } });
};

export const findById = async (id) => {
  return prisma.galleryImage.findUnique({ where: { id } });
};

export const create = async (data) => {
  const item = await prisma.galleryImage.create({ data });
  await clearCache('/api/gallery*');
  return item;
};

export const deleteById = async (id) => {
  await prisma.galleryImage.delete({ where: { id } });
  await clearCache('/api/gallery*');
};
