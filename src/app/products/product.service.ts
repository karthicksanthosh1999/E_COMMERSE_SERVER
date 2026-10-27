import { slugify } from "../../lib/slugify";
import { CreateProductDto } from "./dto/product.schema";
import { ProductEntity } from "./product.entity";
import { ProductRepository } from "./product.repository";

export class ProductService {

    private readonly productRepository: ProductRepository;
    constructor(){
        this.productRepository = new ProductRepository()
    }

    public create = async(productData: CreateProductDto, adminId: string): Promise<ProductEntity> => {
        const { variants, images, ...data } = productData;

        if(variants.some(v => v.price > v.mrp)){
            throw Object.assign( 
                new Error("Price cannot be greater then MRP"),
                { status: 400 }
            );
        };

        let slug = slugify(productData.title);

        const existingSlug = await prisma.product.findUnique({
            where: {
                slug
            }
        });

        if(existingSlug){
            slug = `${slug} - ${Date.now().toString(36)}`;
        }

        const product = await this.productRepository.create(productData, adminId, slug);
        return product;
    }
}