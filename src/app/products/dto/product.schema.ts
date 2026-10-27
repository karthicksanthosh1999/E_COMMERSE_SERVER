import { z } from "zod";

export const createProductSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  categoryId: z.string(),
  fabric: z.string(),
  weave: z.string().optional(),
  region: z.string().optional(),
  occasion: z.string().optional(),
  work: z.string().optional(),
  length: z.string().optional(),
  blouseIncluded: z.boolean().default(true),
  careInstructions: z.string().optional(),
  variants: z.array(z.object({
    sku: z.string(),
    color: z.string(),
    price: z.number().int().positive(),
    mrp: z.number().int().positive(),
    stock: z.number().int().min(0),
  })).min(1),
  images: z.array(z.string().url()).default([]),
});

export const updateProductSchema = createProductSchema
    .omit({ variants: true, images: true })
    .partial()
    .extend({ isActive: z.boolean().optional() })

export const updateVariantSchema = z.object({
    price: z.number().int().positive().optional(),
    mrp: z.number().int().positive().optional(),
    stock: z.number().int().min(0).optional(),
    color: z.string().optional(), 
});

export type CreateProductDto = z.infer<typeof createProductSchema>;