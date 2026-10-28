import { ApiError } from "../../lib/ApiError";
import { ProductCategoryRepository } from "./product_category.repository";
import { CreateProductCategoryDto } from "./dto/product_category.schema";
import { ProductCategoryEntity } from "./product_category.entity";

export class ProductCategoryService {
  private readonly productCategoryRepository: ProductCategoryRepository; 
  constructor() {
    this.productCategoryRepository = new ProductCategoryRepository()
  }

  async create(data: CreateProductCategoryDto): Promise<ProductCategoryEntity> {
    const existing = await this.productCategoryRepository.findById(
        data.productId, data.categoryId
    );

    if (existing) {
      throw new ApiError("Product category already exists", 409);
    }

    return this.productCategoryRepository.create(data);
  }

  async findAll(): Promise<ProductCategoryEntity[]> {
    return this.productCategoryRepository.findAll();
  };

  async findById(data: CreateProductCategoryDto): Promise<ProductCategoryEntity> {
    const productCategory = await this.productCategoryRepository.findById(data.productId, data.categoryId);

    if (!productCategory) {
      throw new ApiError("Product category not found", 404);
    }

    return productCategory;
  }

  async update(data: CreateProductCategoryDto) {
    const existingProductCategory = await this.findById(data);

      if (!existingProductCategory) {
        throw new ApiError("Product category not exists", 409);
      }
      const updatedProductCategory = await this.productCategoryRepository.update(data.productId, data.categoryId, data);
      return updatedProductCategory;
    };

  async delete(data: CreateProductCategoryDto) {
      const existingProductCategory = await this.findById(data);

      if (!existingProductCategory) {
        throw new ApiError("Product category not exists", 409);
      }

      const deletedProductCategory = await this.productCategoryRepository.delete(data.productId, data.categoryId);
      return deletedProductCategory;
  };
}