import { CategoryRepository } from "./category.repository";
import { CategoryEntity } from "./dto/category.entity";
import { CreateCategoryDto, UpdateCategoryDto } from "./dto/category_create.schema";

export class CategoryService {

    private readonly categoryRepository: CategoryRepository;

    constructor(){
        this.categoryRepository = new CategoryRepository();
    };

    public async create(category: CreateCategoryDto): Promise<CategoryEntity> {
        const data = await this.categoryRepository.create(category);
        return data;
    };

    public async findAll(): Promise<CategoryEntity[]> {
        const data = await this.categoryRepository.findAll();
        return data;
    };

    public async findById(id: string): Promise<CategoryEntity | null> {
        const data = await this.categoryRepository.findById(id);
        return data;
    };

    public async delete(id: string): Promise<CategoryEntity> {
        const data = await this.categoryRepository.deleteById(id);
        return data;
    };


    public async updateById(category: UpdateCategoryDto): Promise<CategoryEntity> {
        const data = await this.categoryRepository.updateById(category);
        return data;
    };

}