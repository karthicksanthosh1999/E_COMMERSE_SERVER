import { z } from "zod";

const sareeDetailsSchema = z.object({
  fabric: z.string().optional(), weave: z.string().optional(),
  lengthMeters: z.number().positive().optional(), blouseIncluded: z.boolean().optional(),
  occasion: z.string().optional(), careInstructions: z.string().optional(),
});
const snackDetailsSchema = z.object({
  ingredients: z.array(z.string()).default([]), allergens: z.array(z.string()).default([]),
  netQuantity: z.number().positive().optional(), unit: z.enum(["GRAM", "KILOGRAM", "MILLILITRE", "LITRE", "PACK"]).optional(),
  dietaryTags: z.array(z.string()).default([]), bestBeforeDays: z.number().int().positive().optional(),
});
const vehiclePartSchema = z.object({
  partNumber: z.string().min(1), manufacturer: z.string().optional(), position: z.string().optional(),
});

export const createProductSchema = z.object({
  title: z.string().min(3).max(150),
  slug: z.string().min(3).max(180),
  description: z.string().min(10).optional(),
  brandId: z.string().optional(),
  status: z.enum(["DRAFT", "ACTIVE", "INACTIVE", "ARCHIVED"]).optional(),
  categoryIds: z.array(z.string()).optional(),
  attributes: z.record(z.string(), z.unknown()).optional(),
  sareeDetails: sareeDetailsSchema.optional(),
  snackDetails: snackDetailsSchema.optional(),
  vehiclePart: vehiclePartSchema.optional(),
});

export const updateProductSchema = createProductSchema.partial();

export type CreateProductDto = z.infer<
  typeof createProductSchema
>;

export type UpdateProductDto = z.infer<
  typeof updateProductSchema
>;
