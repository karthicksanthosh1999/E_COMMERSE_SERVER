import { z } from "zod";
import { UnitOfMeasure } from "../../../generated/prisma/client";

export const createProductVariantSchema = z.object({
    id: z.string().optional(),
    productId: z.string().min(3),
    sku : z.string().min(3),
    price: z.number().int().nonnegative(),
    mrp: z.number().int().nonnegative().optional(),
    unitOfMeasure: z.nativeEnum(UnitOfMeasure).optional(),
    attributes: z.record(z.string(), z.unknown()).optional(),
    compatibleVehicleIds: z.array(z.string()).optional()
})

export const updateProductVariantSchema = createProductVariantSchema.partial();

export type CreateProductVariantDto = z.infer<typeof createProductVariantSchema>
export type UpdateProductVariantDto = z.infer<typeof updateProductVariantSchema>
