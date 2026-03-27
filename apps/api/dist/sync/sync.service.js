"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var SyncService_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const amazon_service_1 = require("../amazon/amazon.service");
const product_entity_1 = require("../products/product.entity");
const category_entity_1 = require("../categories/category.entity");
let SyncService = SyncService_1 = class SyncService {
    amazonService;
    productRepo;
    categoryRepo;
    logger = new common_1.Logger(SyncService_1.name);
    constructor(amazonService, productRepo, categoryRepo) {
        this.amazonService = amazonService;
        this.productRepo = productRepo;
        this.categoryRepo = categoryRepo;
    }
    async SyncByAsin(asin, categorySlug) {
        const amazonProduct = await this.amazonService.GetProductByAsin(asin);
        if (!amazonProduct) {
            throw new common_1.NotFoundException(`Product with ASIN ${asin} not found on Amazon`);
        }
        const existing = await this.productRepo.findOne({ where: { externalId: asin } });
        if (existing) {
            await this.productRepo.update(existing.id, {
                price: amazonProduct.price,
                imageUrl: amazonProduct.imageUrl,
                available: amazonProduct.available,
                rating: amazonProduct.rating,
                reviewCount: amazonProduct.reviewCount,
                affiliateUrl: amazonProduct.affiliateUrl,
            });
            this.logger.log(`Updated product: ${existing.name} (${asin})`);
            return { asin, action: 'updated', productId: existing.id, name: existing.name };
        }
        const category = await this.categoryRepo.findOne({ where: { slug: categorySlug } });
        if (!category) {
            throw new common_1.NotFoundException(`Category not found: ${categorySlug}`);
        }
        const created = this.productRepo.create({
            externalId: asin,
            affiliateSource: 'amazon',
            name: amazonProduct.name,
            slug: amazonProduct.slug,
            description: amazonProduct.description,
            imageUrl: amazonProduct.imageUrl,
            price: amazonProduct.price,
            currency: amazonProduct.currency,
            affiliateUrl: amazonProduct.affiliateUrl,
            categoryId: category.id,
            rating: amazonProduct.rating,
            reviewCount: amazonProduct.reviewCount,
            available: amazonProduct.available,
        });
        await this.productRepo.save(created);
        this.logger.log(`Created product: ${created.name} (${asin})`);
        return { asin, action: 'created', productId: created.id, name: created.name };
    }
    async SyncByKeyword(keyword, categorySlug, searchIndex = 'Electronics') {
        const category = await this.categoryRepo.findOne({ where: { slug: categorySlug } });
        if (!category) {
            throw new common_1.NotFoundException(`Category not found: ${categorySlug}`);
        }
        const amazonProducts = await this.amazonService.SearchProducts(keyword, searchIndex);
        if (amazonProducts.length === 0) {
            this.logger.warn(`No results from Amazon for keyword: "${keyword}"`);
            return [];
        }
        const results = [];
        for (const amazonProduct of amazonProducts) {
            const existing = await this.productRepo.findOne({ where: { externalId: amazonProduct.externalId } });
            if (existing) {
                await this.productRepo.update(existing.id, {
                    price: amazonProduct.price,
                    imageUrl: amazonProduct.imageUrl,
                    available: amazonProduct.available,
                    rating: amazonProduct.rating,
                    reviewCount: amazonProduct.reviewCount,
                    affiliateUrl: amazonProduct.affiliateUrl,
                });
                results.push({ asin: amazonProduct.externalId, action: 'updated', productId: existing.id, name: existing.name });
                continue;
            }
            const created = this.productRepo.create({
                externalId: amazonProduct.externalId,
                affiliateSource: 'amazon',
                name: amazonProduct.name,
                slug: amazonProduct.slug,
                description: amazonProduct.description,
                imageUrl: amazonProduct.imageUrl,
                price: amazonProduct.price,
                currency: amazonProduct.currency,
                affiliateUrl: amazonProduct.affiliateUrl,
                categoryId: category.id,
                rating: amazonProduct.rating,
                reviewCount: amazonProduct.reviewCount,
                available: amazonProduct.available,
            });
            try {
                await this.productRepo.save(created);
                results.push({ asin: amazonProduct.externalId, action: 'created', productId: created.id, name: created.name });
            }
            catch {
                this.logger.warn(`Skipped duplicate slug for ID ${amazonProduct.externalId}`);
                results.push({ asin: amazonProduct.externalId, action: 'skipped', productId: '', name: amazonProduct.name });
            }
        }
        return results;
    }
};
exports.SyncService = SyncService;
exports.SyncService = SyncService = SyncService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.ProductEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(category_entity_1.CategoryEntity)),
    __metadata("design:paramtypes", [amazon_service_1.AmazonService, typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object])
], SyncService);
//# sourceMappingURL=sync.service.js.map