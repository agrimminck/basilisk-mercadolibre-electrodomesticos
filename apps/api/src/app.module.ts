import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { ProductsModule } from './products/products.module'
import { CategoriesModule } from './categories/categories.module'
import { AmazonModule } from './amazon/amazon.module'
import { DatabaseModule } from './database/database.module'
import { SyncModule } from './sync/sync.module'
import { CategoryEntity } from './categories/category.entity'
import { ProductEntity } from './products/product.entity'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'),
        entities: [CategoryEntity, ProductEntity],
        // Auto-creates tables in dev — switch to migrations before production
        synchronize: true,
      }),
    }),
    ProductsModule,
    CategoriesModule,
    AmazonModule,
    DatabaseModule,
    SyncModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
