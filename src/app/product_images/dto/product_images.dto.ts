import { z } from "zod";

export const createProductImagesSchema = z.object({
    productId: z.string().min(3),
    variantId: z.string().optional(),
    url: z.string().min(3),
    altText: z.string().min(3),
    position: z.number(),
})

export const updateProductImageSchema = createProductImagesSchema.partial();

export type CreateProductImagesDto = z.infer<typeof createProductImagesSchema>
export type UpdateProductImagesDto = z.infer<typeof updateProductImageSchema>