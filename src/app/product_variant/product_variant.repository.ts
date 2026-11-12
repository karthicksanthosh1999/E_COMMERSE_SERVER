import { prisma } from "../../db/prisma";
import { Prisma } from "../../generated/prisma/client";
import { UpdateProductCategoryDto } from "../product_category/dto/product_category.schema";
import { CreateProductVariantDto, UpdateProductVariantDto } from "./dto/product_variant.schema";
import { ProductVariantEntity } from "./product_variant.entity";

export class ProductVariantRepository {
    
    public create = async(productVariantData: CreateProductVariantDto): Promise<ProductVariantEntity> => {
        const productVariant = await prisma.productVariant.create({
            data: {
                productId: productVariantData.productId,
                sku: productVariantData.sku,
                price: productVariantData.price,
                mrp: productVariantData.mrp,
                unitOfMeasure: productVariantData.unitOfMeasure,
                attributes: productVariantData.attributes === undefined ? undefined : (productVariantData.attributes as Prisma.InputJsonObject),
                compatibleVehicles: productVariantData.compatibleVehicleIds ? {
                    create: productVariantData.compatibleVehicleIds.map(vehicleId => ({ vehicle: { connect: { id: vehicleId } } }))
                } : undefined,
            }
        });
        return productVariant;
    };
    
    public findById = async(id: string): Promise<ProductVariantEntity | null> => {
        const productVariant = await prisma.productVariant.findUnique({
            where: {
                id
            }
        });

        return productVariant;
    };

    public findAll = async(): Promise<ProductVariantEntity[]> => {
        const productVariant = await prisma.productVariant.findMany();
        return productVariant;
    };

    public delete = async(id: string): Promise<ProductVariantEntity> => {
        const productVariant = await prisma.productVariant.delete(
            {
                where: { id }
            }
        );
        return productVariant;
    };

    public update = async(id: string, productVariantData: UpdateProductVariantDto): Promise<ProductVariantEntity> => {
        const productVariant = await prisma.productVariant.update(
            {
                where: { id },
                data: {
                    productId: productVariantData.productId,
                    sku: productVariantData.sku,
                    price: productVariantData.price,
                    mrp: productVariantData.mrp,
                    unitOfMeasure: productVariantData.unitOfMeasure,
                    attributes: productVariantData.attributes === undefined ? undefined : productVariantData.attributes as Prisma.InputJsonObject,
                    compatibleVehicles: productVariantData.compatibleVehicleIds ? {
                        deleteMany: {},
                        create: productVariantData.compatibleVehicleIds.map(vehicleId => ({ vehicle: { connect: { id: vehicleId } } }))
                    } : undefined,
                }
            }
        );
        return productVariant;
    };
};
