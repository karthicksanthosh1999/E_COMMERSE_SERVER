import { CreateProductImagesDto } from "./dto/product_images.dto";
import { ProductImagesEntity } from "./product_images.entity";
import { ProductImagesRepository } from "./product_images.repository";

export class ProductImagesService {
    private readonly productImagesController: ProductImagesRepository;
    constructor(){
        this.productImagesController = new ProductImagesRepository()
    };

    public create = async(data: CreateProductImagesDto): Promise<ProductImagesEntity> => {
        const images = await this.productImagesController.create(data);
        return images;
    };
}