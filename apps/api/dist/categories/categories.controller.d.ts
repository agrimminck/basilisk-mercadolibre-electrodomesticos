import { CategoriesService } from './categories.service';
import type { CategoryEntity as Category } from './category.entity';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    FindAll(): Promise<Category[]>;
    FindBySlug(slug: string): Promise<Category>;
}
