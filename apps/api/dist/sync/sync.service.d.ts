import { Repository } from 'typeorm';
import { AmazonService } from '../amazon/amazon.service';
import { ProductEntity } from '../products/product.entity';
import { CategoryEntity } from '../categories/category.entity';
export interface SyncResult {
    asin: string;
    action: 'created' | 'updated' | 'skipped';
    productId: string;
    name: string;
}
export declare class SyncService {
    private readonly amazonService;
    private readonly productRepo;
    private readonly categoryRepo;
    private readonly logger;
    constructor(amazonService: AmazonService, productRepo: Repository<ProductEntity>, categoryRepo: Repository<CategoryEntity>);
    SyncByAsin(asin: string, categorySlug: string): Promise<SyncResult>;
    SyncByKeyword(keyword: string, categorySlug: string, searchIndex?: string): Promise<SyncResult[]>;
}
