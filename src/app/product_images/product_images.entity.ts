import { ProductVariantEntity } from "../product_variant/product_variant.entity";
import { ProductEntity } from "../products/product.entity";

export class ProductImagesEntity {
    public id?: string;
    public productId: string;
    public variantId: string | null;
    public url: string;
    public altText: string | null;
    public position: number;
    
    public product?: ProductEntity | null;
    public variant?: ProductVariantEntity | null;

    constructor(data: {
        id: string,
        productId: string,
        variantId: string | null;
        url: string;
        altText: string | null;
        position: number;
        product?: ProductEntity | null;
        variant?: ProductVariantEntity | null;
    }){
        this.id = data.id;
        this.productId = data.productId;
        this.variantId = data.variantId;
        this.url = data.url;
        this.altText = data.altText;
        this.position = data.position;
        this.product = data.product;
        this.variant = data.variant;
    }
}