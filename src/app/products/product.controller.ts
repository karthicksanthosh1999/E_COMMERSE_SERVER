import { Request, Response } from "express";
import { ProductService } from "./product.service";
import { createProductSchema, updateProductSchema } from "./dto/product.schema";
import { ApiError } from "../../lib/ApiError";
import { APIResponse } from "../../lib/APIResponse";

export class ProductController {
  constructor(
    private readonly productService = new ProductService()
  ) {}

  create = async (req: Request, res: Response) => {
    const parsed = createProductSchema.safeParse(req.body);

    if (!parsed.success) {
      throw new ApiError(parsed.error.message, 400);
    }

    const product = await this.productService.create(parsed.data);

    return res
      .status(201)
      .json(new APIResponse("Product created successfully", 201, product));
  };

  findAll = async (_req: Request, res: Response) => {
    const products = await this.productService.findAll();

    return res
      .status(200)
      .json(new APIResponse("Products fetched successfully", 200, products));
  };

  filter = async (req: Request, res: Response) => {
    const { page, limit, search } = req.body;
    const products = await this.productService.findAllProducts({ limit, page, search });

    return res
      .status(200)
      .json(new APIResponse("Products fetched successfully", 200, products));
  };

  findById = async (req: Request<{ id: string }>, res: Response) => {

    const { id } = req.params;

    const product = await this.productService.findById(id);

    return res
      .status(200)
      .json(new APIResponse("Product fetched successfully", 200, product));
  };

  update = async (req: Request <{ id: string }>, res: Response) => {
    const data = req.body;
    const { id } = req.params;

    const parsed = updateProductSchema.safeParse(data);

    if (!parsed.success) {
      throw new ApiError(parsed.error.message, 400);
    }

    const product = await this.productService.update( id, parsed.data);

    return res
      .status(200)
      .json(new APIResponse("Product updated successfully", 200, product));
  };

  delete = async (req: Request <{ id: string }>, res: Response) => {
    const { id } = req.params;
    await this.productService.delete(id);

    return res
      .status(200)
      .json(new APIResponse("Product deleted successfully", 200, null));
  };
}