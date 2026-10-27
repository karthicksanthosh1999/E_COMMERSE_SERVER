import { z } from "zod";

export const createProductCategorySchema = z.object({
  productId: z.string().min(3).max(150),
  categoryId: z.string().min(3).max(180)
});

export const updateProductCategorySchema = createProductCategorySchema.partial();

export type CreateProductCategoryDto = z.infer<
  typeof createProductCategorySchema
>;

export type UpdateProductCategoryDto = z.infer<
  typeof updateProductCategorySchema
>;