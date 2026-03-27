import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../categories/category.entity';
import { ProductEntity } from '../products/product.entity';
export declare class SeedService implements OnModuleInit {
    private readonly categoryRepo;
    private readonly productRepo;
    private readonly logger;
    constructor(categoryRepo: Repository<CategoryEntity>, productRepo: Repository<ProductEntity>);
    onModuleInit(): Promise<void>;
    private UpsertCatalog;
}
