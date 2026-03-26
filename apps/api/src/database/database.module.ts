import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CategoryEntity } from '../categories/category.entity'
import { ProductEntity } from '../products/product.entity'
import { SeedService } from './seed.service'

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity, ProductEntity])],
  providers: [SeedService],
})
export class DatabaseModule {}
