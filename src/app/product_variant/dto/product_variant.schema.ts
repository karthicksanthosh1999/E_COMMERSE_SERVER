import { z } from "zod";

export const createProductVariantSchema = z.object({
    id: z.string().optional(),
    productId: z.string().min(3),
    sku : z.string().min(3),
    price: z.number(),
    mrp: z.number().optional(),
    attributes: z.record(z.string(), z.unknown()).optional()
})

export const updateProductVariantSchema = createProductVariantSchema.partial();

export type CreateProductVariantDto = z.infer<typeof createProductVariantSchema>
export type UpdateProductVariantDto = z.infer<typeof updateProductVariantSchema>