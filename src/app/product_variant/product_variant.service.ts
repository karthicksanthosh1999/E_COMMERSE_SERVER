import { ApiError } from "../../lib/ApiError";
import { CreateProductVariantDto, UpdateProductVariantDto } from "./dto/product_variant.schema";
import { ProductVariantEntity } from "./product_variant.entity";
import { ProductVariantRepository } from "./product_variant.repository";

export class ProductVariantService {
    private readonly productVariantRepository: ProductVariantRepository;

    constructor(){
        this.productVariantRepository = new ProductVariantRepository();
    }

    public create = async(data: CreateProductVariantDto): Promise<ProductVariantEntity> => {
        const product = await this.productVariantRepository.create(data);
        return product;
    };

    public findAll = async(): Promise<ProductVariantEntity[]> => {
        const product = await this.productVariantRepository.findAll();
        return product;
    };

    public findById = async(id: string): Promise<ProductVariantEntity> => {
        if(!id) {
            throw new ApiError("ID is required", 400)
        };
        const product = await this.productVariantRepository.findById(id);
        if(!product) {
            throw new ApiError("Product variant is not found", 400)
        };
        return product;
    };

    public delete = async(id: string): Promise<ProductVariantEntity> => {
        if(!id) {
            throw new ApiError("ID is required", 400)
        };
        const product = await this.productVariantRepository.delete(id);
        if(!product) {
            throw new ApiError("Product variant is not found", 400)
        };
        return product;
    };

    public update = async(data: UpdateProductVariantDto): Promise<ProductVariantEntity> => {
        if(!data.id) {
            throw new ApiError("ID is required", 400)
        };
        const product = await this.productVariantRepository.update(data.id, data);
        return product;
    };
}