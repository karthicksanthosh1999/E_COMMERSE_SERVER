import { Request, Response } from "express";
import { CategoryService } from "./category.service";
import { APIResponse } from "../../lib/APIResponse";
import { ApiError } from "../../lib/ApiError";

export class CategoryController {
    
    private readonly categoryService: CategoryService;

    constructor(){
        this.categoryService = new CategoryService();
    };

    public create = async(req: Request, res: Response): Promise<void> => {
        const data = req.body;
        const category = await this.categoryService.create(data);
        res.status(200).json( new APIResponse("Category created successfully", 201, category));
    };

    public findAll= async(_req: Request, res: Response): Promise<void> => {
        const categories = await this.categoryService.findAll();
        res.status(200).json( new APIResponse("Category fetched successfully", 200, categories));
    };

    public deleteById = async(req: Request<{ id: string }>, res: Response): Promise<void> => {
        const { id } = req.params;
        if(!id) throw new ApiError("ID is required", 400);
        const categories = await this.categoryService.delete(id);
        res.json( new APIResponse("Category deleted successfully", 200, categories));
    };

    public findById = async(req: Request<{ id: string }>, res: Response): Promise<void> => {
        const { id } = req.params;
        if(!id) throw new ApiError("ID is required", 400);
        const category = await this.categoryService.findById(id);
        if(!category) throw new ApiError("Category not found", 400);
        res.json( new APIResponse("Category fetched successfully", 200, category));
    };

    public updateById = async(req: Request, res: Response): Promise<void> => {
        const data = req.body;
        const category = await this.categoryService.updateById(data);
        if(!category) throw new ApiError("Category not found", 400);
        res.json( new APIResponse("Category updated successfully", 200, category));
    };

}