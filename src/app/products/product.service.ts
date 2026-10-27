import { ProductRepository } from "./product.repository";
import { CreateProductDto, UpdateProductDto } from "./dto/product.schema";
import { ApiError } from "../../lib/ApiError";

export class ProductService {
  constructor(
    private readonly productRepository = new ProductRepository()
  ) {}

  async create(data: CreateProductDto) {
    const existing = await this.productRepository.findBySlug(
      data.slug
    );

    if (existing) {
      throw new ApiError("Product slug already exists", 409);
    }

    return this.productRepository.create(data);
  }

  async findAll() {
    return this.productRepository.findAll();
  };

  async findAllProducts(query: {
        page?: number;
        limit?: number;
        search?: string;
    }) {
        const page = Math.max(1, query.page ?? 1);
        const limit = Math.min(50, Math.max(1, query.limit ?? 10));

        const { products, totalProducts } =
            await this.productRepository.filterProducts({
            skip: (page - 1) * limit,
            take: limit,
            search: query.search,
            sortBy: "createdAt",
            sortOrder: "desc",
        });

        return {
                products,
                pagination: {
                totalProducts,
                currentPage: page,
                limit,
                totalPages: Math.ceil(totalProducts / limit),
                },
        };
    };

  async findById(id: string) {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new ApiError("Product not found", 404);
    }

    return product;
  }

  async update(id: string, data: UpdateProductDto) {
    await this.findById(id);

    if (data.slug) {
      const existing = await this.productRepository.findBySlug(
        data.slug
      );

      if (existing && existing.id !== id) {
        throw new ApiError("Product slug already exists", 409);
      }
    }

    return this.productRepository.update(id, data);
  }

  async delete(id: string) {
    await this.findById(id);

    return this.productRepository.delete(id);
  }
}