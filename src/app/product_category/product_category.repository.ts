import { prisma } from "../../db/prisma";
import {
  CreateProductCategoryDto,
  UpdateProductCategoryDto,
} from "./dto/product_category.schema";

export class ProductCategoryRepository {
  // Assign a category to a product
  async create(data: CreateProductCategoryDto) {
    return prisma.productCategory.create({
      data: {
        productId: data.productId,
        categoryId: data.categoryId,
      },
    });
  }

  // Get all product-category relationships
  async findAll() {
    return prisma.productCategory.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        product: true,
        category: true,
      },
    });
  }

  // Find a relationship using the composite key
  async findById(productId: string, categoryId: string) {
    return prisma.productCategory.findUnique({
      where: {
        productId_categoryId: {
          productId,
          categoryId,
        },
      },
      include: {
        product: true,
        category: true,
      },
    });
  }

  // Find all categories assigned to a product
  async findByProductId(productId: string) {
    return prisma.productCategory.findMany({
      where: { productId },
      include: {
        category: true,
      },
    });
  }

  // Find all products assigned to a category
  async findByCategoryId(categoryId: string) {
    return prisma.productCategory.findMany({
      where: { categoryId },
      include: {
        product: true,
      },
    });
  }

  // Update the category assigned to a product
  async update(
    productId: string,
    categoryId: string,
    data: UpdateProductCategoryDto
  ) {
    return prisma.productCategory.update({
      where: {
        productId_categoryId: {
          productId,
          categoryId,
        },
      },
      data,
    });
  }

  // Remove a category assignment from a product
  async delete(productId: string, categoryId: string) {
    return prisma.productCategory.delete({
      where: {
        productId_categoryId: {
          productId,
          categoryId,
        },
      },
    });
  }
}