import { JsonValue } from "@prisma/client/runtime/client";
import { UnitOfMeasure } from "../../generated/prisma/client";

export class ProductVariantEntity {
    public id?: string;
    public productId: string;
    public sku: string;
    public price: number;
    public mrp: number | null;
    public attributes: JsonValue | null;
    public unitOfMeasure: UnitOfMeasure;
    public isActive: boolean;

    constructor(data: {
            id?: string;
            productId: string;
            sku: string;
            price: number;
            mrp: number | null;
            attributes: JsonValue | null;
            unitOfMeasure: UnitOfMeasure;
            isActive: boolean;
        }
    ){
        this.id = data.id
        this.productId = data.productId
        this.sku = data.sku
        this.price = data.price
        this.mrp = data.mrp
        this.attributes = data.attributes
        this.unitOfMeasure = data.unitOfMeasure
        this.isActive = data.isActive
    }

}