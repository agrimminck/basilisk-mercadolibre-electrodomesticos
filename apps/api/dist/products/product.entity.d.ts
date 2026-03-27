import { CategoryEntity } from '../categories/category.entity';
export type AffiliateSource = 'amazon' | 'mercadolibre';
export declare class ProductEntity {
    id: string;
    externalId: string;
    affiliateSource: AffiliateSource;
    name: string;
    slug: string;
    description: string;
    imageUrl: string;
    price: number;
    currency: string;
    affiliateUrl: string;
    categoryId: string;
    rating: number | null;
    reviewCount: number | null;
    available: boolean;
    createdAt: Date;
    updatedAt: Date;
    category: CategoryEntity;
}
