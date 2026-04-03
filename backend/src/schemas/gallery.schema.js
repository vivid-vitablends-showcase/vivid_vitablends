import { z } from 'zod';

export const galleryCreateSchema = z.object({
  title: z.string().min(1).max(200),
  image: z.string().url().or(z.string().startsWith('data:image/')),
  displayOrder: z.number().int().optional(),
});

export const galleryDeleteSchema = z.object({
  id: z.string().cuid(),
});
