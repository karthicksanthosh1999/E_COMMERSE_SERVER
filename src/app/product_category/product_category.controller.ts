import { Request, Response } from "express";
import { ApiError } from "../../lib/ApiError";
import { APIResponse } from "../../lib/APIResponse";
import { ProductCategoryService } from "./product_category.service";
import { createProductCategorySchema, updateProductCategorySchema } from "./dto/product_category.schema";

export class ProductCategoryController {
  constructor(
    private readonly productCategoryService = new ProductCategoryService()
  ) {}

  create = async (req: Request, res: Response) => {
    const parsed = createProductCategorySchema.safeParse(req.body);

    if (!parsed.success) {
      throw new ApiError(parsed.error.message, 400);
    }

    const product = await this.productCategoryService.create(parsed.data);

    return res
      .status(201)
      .json(new APIResponse("Product category created successfully", 201, product));
  };

  findAll = async (_req: Request, res: Response) => {
    const products = await this.productCategoryService.findAll();

    return res
      .status(200)
      .json(new APIResponse("Product categories fetched successfully", 200, products));
  };

  findById = async (req: Request, res: Response) => {

    const data = req.body;

    const product = await this.productCategoryService.findById(data);

    return res
      .status(200)
      .json(new APIResponse("Product category fetched successfully", 200, product));
  };

  update = async (req: Request , res: Response) => {
    const data = req.body;
    const product = await this.productCategoryService.update(data);

    return res
      .status(200)
      .json(new APIResponse("Product category updated successfully", 200, product));
  };

  delete = async (req: Request, res: Response) => {
    const data = req.body;
    const productCategory = await this.productCategoryService.delete(data);

    return res
      .status(200)
      .json(new APIResponse("Product category deleted successfully", 200, productCategory));
  };
}