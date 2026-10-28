import { z } from "zod";

export const createProductSchema = z.object({
  title: z.string().min(3).max(150),
  slug: z.string().min(3).max(180),
  description: z.string().min(10),
  attributes: z.record(z.string(), z.unknown()).optional(),
});

export const updateProductSchema = createProductSchema.partial();

export type CreateProductDto = z.infer<
  typeof createProductSchema
>;

export type UpdateProductDto = z.infer<
  typeof updateProductSchema
>;