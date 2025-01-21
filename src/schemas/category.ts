import { z } from 'zod';

export const newCategorySchema = z.object({
    name: z.string(),
});

export const updateSchema = z.object({
    name: z.string().optional(),
});
