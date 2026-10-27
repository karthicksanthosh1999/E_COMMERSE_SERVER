import { prisma } from "../../db/prisma";
import { CategoryEntity } from "./dto/category.entity";
import { CreateCategoryDto, UpdateCategoryDto } from "./dto/category_create.schema";

export class CategoryRepository {
    
    async create (categoryData: CreateCategoryDto): Promise<CategoryEntity> {
        const category = await prisma.category.create({ data: categoryData });
        return category;
    };

    async findAll(): Promise<CategoryEntity[]> {
        const categories = await prisma.category.findMany();
        return categories;
    };

    async findById(categoryId: string): Promise<CategoryEntity | null> {
        const category = await prisma.category.findUnique({ 
            where: {
                id: categoryId
            }
         })
         return category;
    };

    async deleteById(categoryId: string): Promise<CategoryEntity> {
        const category = await prisma.category.delete({
            where: {
                id: categoryId
            }
        });
        return category;
    };

    async updateById( categoryData: UpdateCategoryDto): Promise<CategoryEntity> {
        const category = await prisma.category.update({
            where: { id: categoryData?.id },
            data: categoryData,
        });

        return category;
    };

}