import { z } from "zod";

export const createCategoryAttributeSchema = z.object({
  categoryId: z.string().min(1),

  key: z
    .string()
    .min(2)
    .max(100)
    .regex(/^[a-z][a-zA-Z0-9]*$/),

  label: z.string().min(2).max(100),

  type: z.enum([
    "TEXT",
    "NUMBER",
    "SELECT",
    "MULTI_SELECT",
    "BOOLEAN",
    "DATE",
    "TEXTAREA",
  ]),

  scope: z.enum([ "PRODUCT", "VARIANT" ]).default("PRODUCT"),

  isRequired: z.boolean().default(false),

  options: z.array(z.string()).optional().nullable(),

  position: z.number().int().min(0).default(0),

  isActive: z.boolean().default(true),
});

export type CreateCategoryAttributeDto = z.infer<
  typeof createCategoryAttributeSchema
>;

export const updateCategoryAttributeSchema =
  createCategoryAttributeSchema
    .omit({ categoryId: true })
    .partial();

export type UpdateCategoryAttributeDto = z.infer<
  typeof updateCategoryAttributeSchema
>;