import { z } from 'zod';

export const newProductSchema = z.object({
    name: z.string(),
    price: z.number(),
    description: z.string().optional(),
});

export const updateProductSchema = z.object({
    name: z.string().optional(),
    price: z.number().optional(),
    description: z.string().optional(),
});
