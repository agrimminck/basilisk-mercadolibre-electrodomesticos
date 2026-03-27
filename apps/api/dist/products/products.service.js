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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./product.entity");
let ProductsService = class ProductsService {
    productRepository;
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async FindAll(categorySlug, searchQuery, source) {
        const query = this.productRepository
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.category', 'category')
            .where('product.available = :available', { available: true })
            .orderBy('product.rating', 'DESC', 'NULLS LAST');
        if (source) {
            query.andWhere('product.affiliateSource = :source', { source });
        }
        if (categorySlug) {
            query.andWhere('category.slug = :slug', { slug: categorySlug });
        }
        if (searchQuery) {
            const term = `%${searchQuery}%`;
            query.andWhere('(LOWER(product.name) LIKE LOWER(:term) OR LOWER(product.description) LIKE LOWER(:term))', { term });
        }
        return query.getMany();
    }
    async FindBySlug(slug) {
        const product = await this.productRepository.findOne({
            where: { slug },
            relations: ['category'],
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product '${slug}' not found`);
        }
        return product;
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.ProductEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], ProductsService);
//# sourceMappingURL=products.service.js.map