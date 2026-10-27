import { prisma } from "../../db/prisma";
import { CreateProductDto } from "./dto/product.schema";
import { ProductEntity } from "./product.entity";

export class ProductRepository {
    public create = async(productData: CreateProductDto, adminId: string, slug: string): Promise<ProductEntity>  => {
       const { variants, images, ...data } = productData;

        const product = await prisma.product.create({ 
            data:  {
                ...data,
                slug,
                variants: { create: variants },
                images: { create: images.map((url, position) => ({url, position}))},
            },
            include: { variants: true, images: true}
        });

        await prisma.auditLog.create({
            data: {
                adminId,
                action: "PRODUCT_CREATE",
                entity: "Product",
                entityId: product.id
            }
        })
        return product;
    };
}