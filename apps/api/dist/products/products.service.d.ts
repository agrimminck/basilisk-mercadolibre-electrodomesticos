import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';
import type { ProductEntity as Product } from './product.entity';
export declare class ProductsService {
    private readonly productRepository;
    constructor(productRepository: Repository<ProductEntity>);
    FindAll(categorySlug?: string, searchQuery?: string, source?: string): Promise<Product[]>;
    FindBySlug(slug: string): Promise<Product>;
}
