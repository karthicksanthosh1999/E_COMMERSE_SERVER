import { Response, Request } from "express";
import { ProductVariantService } from "./product_variant.service";
import { APIResponse } from "../../lib/APIResponse";
import { UpdateProductVariantDto } from "./dto/product_variant.schema";

export class ProductVariantController {
    private readonly productVariantService: ProductVariantService;
    constructor(){
        this.productVariantService = new ProductVariantService();
    };

    public create = async(req: Request, res: Response): Promise<void> => {
        const data = req.body;
        const product = await this.productVariantService.create(data);
        res.json( new APIResponse("Product variant created successfully", 201, product))
    };
    
    public findAll = async(_req: Request, res: Response): Promise<void> => {
        const product = await this.productVariantService.findAll();
        res.json( new APIResponse("Product variant fetched successfully", 200, product))
    };
    
    public findById = async(req: Request<{id: string}>, res: Response): Promise<void> => {
        const { id } = req.params;
        const product = await this.productVariantService.findById(id);
        res.json( new APIResponse("Product variant fetched successfully", 200, product))
    };

    public delete = async(req: Request<{id: string}>, res: Response): Promise<void> => {
        const { id } = req.params;
        const product = await this.productVariantService.delete(id);
        res.json( new APIResponse("Product variant deleted successfully", 200, product))
    };

    public update = async(req: Request , res: Response): Promise<void> => {
        const data = req.body;
        const product = await this.productVariantService.update(data);
        res.json( new APIResponse("Product variant updated successfully", 200, product))
    };

    
}