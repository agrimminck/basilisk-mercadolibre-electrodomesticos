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
var MercadoLibreService_1;
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MercadoLibreService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const SITE_DOMAINS = {
    MLA: 'www.mercadolibre.com.ar',
    MLB: 'www.mercadolivre.com.br',
    MLM: 'www.mercadolibre.com.mx',
    MLC: 'www.mercadolibre.cl',
};
let MercadoLibreService = MercadoLibreService_1 = class MercadoLibreService {
    config;
    logger = new common_1.Logger(MercadoLibreService_1.name);
    baseUrl = 'https://api.mercadolibre.com';
    constructor(config) {
        this.config = config;
    }
    async SearchProducts(keyword, siteId = 'MLA') {
        this.logger.log(`Searching ML products: "${keyword}" in ${siteId}`);
        let data;
        try {
            const res = await fetch(`${this.baseUrl}/sites/${siteId}/search?q=${encodeURIComponent(keyword)}&limit=10`);
            if (!res.ok) {
                this.logger.error(`ML search HTTP ${res.status} for "${keyword}"`);
                return [];
            }
            data = (await res.json());
        }
        catch (err) {
            this.logger.error(`ML search network error: ${String(err)}`);
            return [];
        }
        const affiliateId = this.config.get('ML_AFFILIATE_ID') ?? '';
        return data.results.map((item) => this.MapSearchResultToProduct(item, siteId, affiliateId));
    }
    async GetProductById(itemId, siteId = 'MLA') {
        this.logger.log(`Fetching ML product: ${itemId}`);
        let data;
        try {
            const res = await fetch(`${this.baseUrl}/items/${itemId}`);
            if (!res.ok) {
                this.logger.error(`ML item HTTP ${res.status} for ${itemId}`);
                return null;
            }
            data = (await res.json());
        }
        catch (err) {
            this.logger.error(`ML item network error: ${String(err)}`);
            return null;
        }
        const affiliateId = this.config.get('ML_AFFILIATE_ID') ?? '';
        return this.MapItemToProduct(data, siteId, affiliateId);
    }
    BuildAffiliateUrl(permalink, affiliateId) {
        if (!affiliateId)
            return permalink;
        const separator = permalink.includes('?') ? '&' : '?';
        return `${permalink}${separator}referral=${affiliateId}`;
    }
    MapSearchResultToProduct(item, siteId, affiliateId) {
        const now = new Date();
        const affiliateUrl = this.BuildAffiliateUrl(item.permalink, affiliateId);
        const slug = BuildMlSlug(item.title, item.id);
        return {
            id: item.id,
            externalId: item.id,
            affiliateSource: 'mercadolibre',
            name: item.title,
            slug,
            description: '',
            imageUrl: item.thumbnail.replace('I.jpg', 'O.jpg'),
            price: item.price,
            currency: item.currency_id,
            affiliateUrl,
            categoryId: '',
            rating: null,
            reviewCount: null,
            available: item.available_quantity > 0,
            createdAt: now,
            updatedAt: now,
            category: undefined,
        };
    }
    MapItemToProduct(item, siteId, affiliateId) {
        const now = new Date();
        const affiliateUrl = this.BuildAffiliateUrl(item.permalink, affiliateId);
        const slug = BuildMlSlug(item.title, item.id);
        const imageUrl = item.pictures?.[0]?.url ?? '';
        return {
            id: item.id,
            externalId: item.id,
            affiliateSource: 'mercadolibre',
            name: item.title,
            slug,
            description: '',
            imageUrl,
            price: item.price,
            currency: item.currency_id,
            affiliateUrl,
            categoryId: '',
            rating: null,
            reviewCount: null,
            available: item.status === 'active' && item.available_quantity > 0,
            createdAt: now,
            updatedAt: now,
            category: undefined,
        };
    }
};
exports.MercadoLibreService = MercadoLibreService;
exports.MercadoLibreService = MercadoLibreService = MercadoLibreService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], MercadoLibreService);
function BuildMlSlug(title, itemId) {
    const base = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .slice(0, 60);
    return `${base}-${itemId.toLowerCase()}`;
}
//# sourceMappingURL=mercadolibre.service.js.map