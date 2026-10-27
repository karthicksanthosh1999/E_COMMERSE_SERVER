import { prisma } from "../../db/prisma";
import { CreateProductDto, UpdateProductDto } from "./dto/product.schema";

export class ProductRepository {
  async create(data: CreateProductDto) {
    return prisma.product.create({
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        attributes: data.attributes,
      },
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
      data,
    });
  }

  async delete(id: string) {
    return prisma.product.delete({
      where: { id },
    });
  }
}