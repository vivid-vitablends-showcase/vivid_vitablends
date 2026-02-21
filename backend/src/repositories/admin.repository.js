import prisma from '../utils/prisma.js';

export const findByUsername = async (username) => {
  return prisma.admin.findUnique({ where: { username } });
};

export const create = async (data) => {
  return prisma.admin.create({ data });
};
