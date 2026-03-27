"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const products_module_1 = require("./products/products.module");
const categories_module_1 = require("./categories/categories.module");
const amazon_module_1 = require("./amazon/amazon.module");
const mercadolibre_module_1 = require("./mercadolibre/mercadolibre.module");
const database_module_1 = require("./database/database.module");
const sync_module_1 = require("./sync/sync.module");
const category_entity_1 = require("./categories/category.entity");
const product_entity_1 = require("./products/product.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    type: 'postgres',
                    url: config.get('DATABASE_URL'),
                    entities: [category_entity_1.CategoryEntity, product_entity_1.ProductEntity],
                    synchronize: true,
                }),
            }),
            products_module_1.ProductsModule,
            categories_module_1.CategoriesModule,
            amazon_module_1.AmazonModule,
            mercadolibre_module_1.MercadoLibreModule,
            database_module_1.DatabaseModule,
            sync_module_1.SyncModule,
        ],
        controllers: [app_controller_1.AppController],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map