export interface Variants {
    productId: string,
    sku: string,
    color: string,
    price: Number,
    mrp: Number,
    stock: Number,
};

export interface ProductImages {
    productId: string,
    url: string,
    position: Number
};

export class ProductEntity {
    public id: string;
    public title: string;
    public description: string | null;
    public slug: string;
    public categoryId: string;
    public fabric: string;
    public weave: string | null;
    public region: string | null;
    public occasion: string | null;
    public work: string | null;
    public length: string | null;
    public blouseIncluded: boolean;
    public careInstructions: string | null;
    public isActive: boolean;
    public variants: Variants[];
    public images: ProductImages[]

    constructor(
        data: {
            id: string,
            title: string,
            description: string | null,
            slug: string,
            categoryId: string,
            fabric: string,
            weave: string | null,
            region: string | null,
            occasion: string | null,
            work: string | null,
            length: string | null,
            blouseIncluded: boolean,
            careInstructions: string | null,
            isActive: boolean,
            variants: Variants[],
            images: ProductImages[]
        }
    ){
        this.id = data.id;
        this.title = data.title;
        this.description = data.description;
        this.slug = data.slug;
        this.categoryId = data.categoryId;
        this.fabric = data.fabric;
        this.weave = data.weave;
        this.region = data.region;
        this.occasion = data.occasion;
        this.work = data.work;
        this.length = data.length;
        this.blouseIncluded = data.blouseIncluded;
        this.careInstructions = data.careInstructions;
        this.isActive = data.isActive;
        this.variants = data.variants;
        this.images = data.images;
    }
}