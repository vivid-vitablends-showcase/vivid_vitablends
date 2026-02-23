import prisma from '../utils/prisma.js';

export const findFeatured = async () => {
  return prisma.product.findMany({
    where: { featured: true },
  });
};

export const findAll = async (filters = {}) => {
  const where = {};
  if (filters.category) where.category = filters.category;
  if (filters.featured !== undefined)
    where.featured = filters.featured === 'true';

  return prisma.product.findMany({ where });
};

export const findByCategory = async (category) => {
  return prisma.product.findMany({
    where: { category },
  });
};

export const findById = async (id) => {
  return prisma.product.findUnique({
    where: { id },
  });
};

export const create = async (data) => {
  return prisma.product.create({ data });
};

export const update = async (id, data) => {
  return prisma.product.update({
    where: { id },
    data,
  });
};

export const deleteProduct = async (id) => {
  return prisma.product.delete({
    where: { id },
  });
};
