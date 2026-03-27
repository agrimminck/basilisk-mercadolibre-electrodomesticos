import { ProductsService } from './products.service';
import type { ProductEntity as Product } from './product.entity';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    FindAll(category?: string, q?: string, source?: string): Promise<Product[]>;
    FindBySlug(slug: string): Promise<Product>;
}
