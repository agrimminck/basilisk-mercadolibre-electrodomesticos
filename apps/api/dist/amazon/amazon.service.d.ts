import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { ProductEntity as Product } from '../products/product.entity';
export declare class AmazonService implements OnModuleInit {
    private readonly config;
    private readonly logger;
    private signer;
    private partnerTag;
    private marketplace;
    private readonly host;
    private readonly region;
    private readonly service;
    constructor(config: ConfigService);
    onModuleInit(): void;
    GetProductByAsin(asin: string): Promise<Product | null>;
    SearchProducts(keyword: string, searchIndex?: string): Promise<Product[]>;
    private CallApi;
    private MapToProduct;
}
