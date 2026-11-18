import { prisma } from "../../db/prisma";
import { CreateProductImagesDto, UpdateProductImagesDto } from "./dto/product_images.dto";
import { ProductImagesEntity } from "./product_images.entity";

export class ProductImagesRepository{
    
    public create = async(productImages: CreateProductImagesDto): Promise<ProductImagesEntity> => {
        const images = await prisma.productImage.create({ data: productImages });
        return images;
    };

    public findAll = async(): Promise<ProductImagesEntity[]> => {
        const images = await prisma.productImage.findMany();
        return images;
    };

    public findById = async(id: string): Promise<ProductImagesEntity | null> => {
        const images = await prisma.productImage.findUnique({ where: { id } });
        return images;
    };

    public delete = async(id: string): Promise<ProductImagesEntity> => {
        const images = await prisma.productImage.delete({ where: { id } });
        return images;
    };

    public update = async(id: string, data: UpdateProductImagesDto): Promise<ProductImagesEntity> => {
        const images = await prisma.productImage.update({ where: { id }, data });
        return images;
    };

}