import { Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';
import type { CategoryEntity as Category } from './category.entity';
export declare class CategoriesService {
    private readonly categoryRepository;
    constructor(categoryRepository: Repository<CategoryEntity>);
    FindAll(): Promise<Category[]>;
    FindBySlug(slug: string): Promise<Category>;
}
