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
var AmazonService_1;
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmazonService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const signature_v4_1 = require("@aws-sdk/signature-v4");
const sha256_js_1 = require("@aws-crypto/sha256-js");
const PAAPI_RESOURCES = [
    'ItemInfo.Title',
    'Offers.Listings.Price',
    'Offers.Listings.Availability.Type',
    'Images.Primary.Large',
    'CustomerReviews.StarRating',
    'CustomerReviews.Count',
];
let AmazonService = AmazonService_1 = class AmazonService {
    config;
    logger = new common_1.Logger(AmazonService_1.name);
    signer;
    partnerTag;
    marketplace;
    host = 'webservices.amazon.com';
    region = 'us-east-1';
    service = 'ProductAdvertisingAPI';
    constructor(config) {
        this.config = config;
    }
    onModuleInit() {
        this.partnerTag = this.config.getOrThrow('AMAZON_PARTNER_TAG');
        this.marketplace = this.config.get('AMAZON_MARKETPLACE', 'www.amazon.com');
        this.signer = new signature_v4_1.SignatureV4({
            credentials: {
                accessKeyId: this.config.getOrThrow('AMAZON_ACCESS_KEY'),
                secretAccessKey: this.config.getOrThrow('AMAZON_SECRET_KEY'),
            },
            region: this.region,
            service: this.service,
            sha256: sha256_js_1.Sha256,
        });
    }
    async GetProductByAsin(asin) {
        this.logger.log(`Fetching product from Amazon: ${asin}`);
        const response = await this.CallApi('/paapi5/getitems', 'com.amazon.paapi5.v1.ProductAdvertisingAPIv1.GetItems', {
            ItemIds: [asin],
            Resources: PAAPI_RESOURCES,
            PartnerTag: this.partnerTag,
            PartnerType: 'Associates',
            Marketplace: this.marketplace,
        });
        if (!response)
            return null;
        if (response.Errors?.length) {
            this.logger.error(`PA-API errors for ASIN ${asin}: ${JSON.stringify(response.Errors)}`);
            return null;
        }
        const item = response.ItemsResult?.Items?.[0];
        if (!item)
            return null;
        return this.MapToProduct(item);
    }
    async SearchProducts(keyword, searchIndex = 'Electronics') {
        this.logger.log(`Searching Amazon products: "${keyword}" in ${searchIndex}`);
        const response = await this.CallApi('/paapi5/searchitems', 'com.amazon.paapi5.v1.ProductAdvertisingAPIv1.SearchItems', {
            Keywords: keyword,
            SearchIndex: searchIndex,
            Resources: PAAPI_RESOURCES,
            PartnerTag: this.partnerTag,
            PartnerType: 'Associates',
            Marketplace: this.marketplace,
            ItemCount: 10,
        });
        if (!response)
            return [];
        if (response.Errors?.length) {
            this.logger.error(`PA-API errors for keyword "${keyword}": ${JSON.stringify(response.Errors)}`);
            return [];
        }
        return (response.SearchResult?.Items ?? []).map((item) => this.MapToProduct(item));
    }
    async CallApi(path, target, payload) {
        const body = JSON.stringify(payload);
        const now = new Date();
        const requestToSign = {
            method: 'POST',
            hostname: this.host,
            path,
            protocol: 'https:',
            headers: {
                'content-type': 'application/json; charset=UTF-8',
                host: this.host,
                'x-amz-date': FormatAmzDate(now),
                'x-amz-target': target,
                'content-encoding': 'amz-1.0',
            },
            body,
        };
        let signedRequest;
        try {
            signedRequest = await this.signer.sign(requestToSign);
        }
        catch (err) {
            this.logger.error(`Failed to sign PA-API request: ${String(err)}`);
            return null;
        }
        let res;
        try {
            res = await fetch(`https://${this.host}${path}`, {
                method: 'POST',
                headers: signedRequest.headers,
                body,
            });
        }
        catch (err) {
            this.logger.error(`PA-API network error: ${String(err)}`);
            return null;
        }
        if (!res.ok) {
            const errorBody = await res.text();
            this.logger.error(`PA-API HTTP ${res.status}: ${errorBody}`);
            return null;
        }
        return res.json();
    }
    MapToProduct(item) {
        const listing = item.Offers?.Listings?.[0];
        const now = new Date();
        return {
            id: item.ASIN,
            externalId: item.ASIN,
            affiliateSource: 'amazon',
            name: item.ItemInfo.Title.DisplayValue,
            slug: BuildSlug(item.ItemInfo.Title.DisplayValue, item.ASIN),
            description: '',
            imageUrl: item.Images?.Primary?.Large?.URL ?? '',
            price: listing?.Price?.Amount ?? 0,
            currency: listing?.Price?.Currency ?? 'USD',
            affiliateUrl: item.DetailPageURL,
            categoryId: '',
            rating: item.CustomerReviews?.StarRating?.Value ?? null,
            reviewCount: item.CustomerReviews?.Count ?? null,
            available: listing?.Availability?.Type === 'Now',
            createdAt: now,
            updatedAt: now,
            category: undefined,
        };
    }
};
exports.AmazonService = AmazonService;
exports.AmazonService = AmazonService = AmazonService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], AmazonService);
function FormatAmzDate(date) {
    return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}
function BuildSlug(title, asin) {
    const base = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .slice(0, 60);
    return `${base}-${asin.toLowerCase()}`;
}
//# sourceMappingURL=amazon.service.js.map