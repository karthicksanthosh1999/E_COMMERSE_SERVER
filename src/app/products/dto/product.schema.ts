import { z } from "zod";

export const createProductSchema = z.object({
  title: z.string().min(3).max(150),
  slug: z.string().min(3).max(180),
  description: z.string().min(10),
  attributes: z.object({
    fabric: z.string().min(1),
    weave: z.string().min(1),
    region: z.string().min(1),
    occasion: z.string().min(1),
    length: z.string().min(1),
    blouseIncluded: z.boolean(),
  }),
});

export const updateProductSchema = createProductSchema.partial();

export type CreateProductDto = z.infer<
  typeof createProductSchema
>;

export type UpdateProductDto = z.infer<
  typeof updateProductSchema
>;