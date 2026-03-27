import { ConfigService } from '@nestjs/config';
import type { ProductEntity as Product } from '../products/product.entity';
export declare class MercadoLibreService {
    private readonly config;
    private readonly logger;
    private readonly baseUrl;
    constructor(config: ConfigService);
    SearchProducts(keyword: string, siteId?: string): Promise<Product[]>;
    GetProductById(itemId: string, siteId?: string): Promise<Product | null>;
    BuildAffiliateUrl(permalink: string, affiliateId: string): string;
    private MapSearchResultToProduct;
    private MapItemToProduct;
}
