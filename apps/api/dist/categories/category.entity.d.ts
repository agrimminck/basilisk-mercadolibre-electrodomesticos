import { ProductEntity } from '../products/product.entity';
export declare class CategoryEntity {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    parentId: string | null;
    products: ProductEntity[];
}
