import { partialRecord, z } from "zod";

export const createCategorySchema = z.object({
    id: z.string().optional(),
    name: z.string().min(3),
    slug: z.string().min(3),
    parentId: z.string().optional(),
})

export const updatedCategorySchema = createCategorySchema.partial();

export type CreateCategoryDto = z.infer<typeof createCategorySchema>;

export type UpdateCategoryDto = z.infer<typeof updatedCategorySchema>;