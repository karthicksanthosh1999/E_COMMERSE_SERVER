import { prisma } from "../../db/prisma";
import { CreateProductDto, UpdateProductDto } from "./dto/product.schema";
import { Prisma } from "../../generated/prisma/client";

export class ProductRepository {
  async create(data: CreateProductDto) {
    return prisma.product.create({
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        attributes: data.attributes === undefined ? undefined : data.attributes as Prisma.InputJsonObject,
        brandId: data.brandId,
        status: data.status,
        categories: data.categoryIds ? { create: data.categoryIds.map(categoryId => ({ categoryId })) } : undefined,
        sareeDetails: data.sareeDetails ? { create: { ...data.sareeDetails, lengthMeters: data.sareeDetails.lengthMeters } } : undefined,
        snackDetails: data.snackDetails ? { create: { ...data.snackDetails, netQuantity: data.snackDetails.netQuantity } } : undefined,
        vehiclePart: data.vehiclePart ? { create: data.vehiclePart } : undefined,
      },
      include: { categories: true, variants: true, vehiclePart: true, sareeDetails: true, snackDetails: true },
    });
  }

  async findAll() {
    return prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        categories: true,
        variants: true,
        vehiclePart: true,
        sareeDetails: true,
        snackDetails: true,
      }
    });
  };

  async filterProducts(params: {
  skip: number;
  take: number;
  search?: string;
  sortBy: "createdAt" | "title";
  sortOrder: "asc" | "desc";
}) {
  const where = params.search
    ? {
        title: {
          contains: params.search,
          mode: "insensitive" as const,
        },
      }
    : {};

  const [products, totalProducts] = await prisma.$transaction([
    prisma.product.findMany({
      where,
      skip: params.skip,
      take: params.take,
      orderBy: {
        [params.sortBy]: params.sortOrder,
      },
    }),
    prisma.product.count({ where }),
  ]);

  return {
    products,
    totalProducts,
  };
}       

  async findById(id: string) {
    return prisma.product.findUnique({
      where: { id },
      include: { categories: true, variants: true, vehiclePart: true, sareeDetails: true, snackDetails: true },
    });
  }

  async findBySlug(slug: string) {
    return prisma.product.findUnique({
      where: { slug },
    });
  }

  async update(id: string, data: UpdateProductDto) {
    return prisma.product.update({
      where: { id },
      data: {
        title: data.title, slug: data.slug, description: data.description,
        brandId: data.brandId, status: data.status,
        attributes: data.attributes === undefined ? undefined : data.attributes as Prisma.InputJsonObject,
        categories: data.categoryIds ? { deleteMany: {}, create: data.categoryIds.map(categoryId => ({ categoryId })) } : undefined,
        sareeDetails: data.sareeDetails ? { upsert: { create: data.sareeDetails, update: data.sareeDetails } } : undefined,
        snackDetails: data.snackDetails ? { upsert: { create: data.snackDetails, update: data.snackDetails } } : undefined,
        vehiclePart: data.vehiclePart ? { upsert: { create: data.vehiclePart, update: data.vehiclePart } } : undefined,
      },
      include: { categories: true, variants: true, vehiclePart: true, sareeDetails: true, snackDetails: true },
    });
  }

  async delete(id: string) {
    return prisma.product.delete({
      where: { id },
    });
  }
}
