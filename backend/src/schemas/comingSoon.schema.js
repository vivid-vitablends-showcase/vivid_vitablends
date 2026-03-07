import { z } from 'zod';

export const comingSoonSchema = z.object({
  name: z.string().min(1).max(200),
  image: z.string().url().or(z.string().startsWith('data:image/')),
  displayOrder: z.number().int().optional(),
});

export const comingSoonUpdateSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(1).max(200).optional(),
  image: z.string().url().or(z.string().startsWith('data:image/')).optional(),
  displayOrder: z.number().int().optional(),
});
