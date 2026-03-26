import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SyncController } from './sync.controller'
import { SyncService } from './sync.service'
import { AmazonModule } from '../amazon/amazon.module'
import { ProductEntity } from '../products/product.entity'
import { CategoryEntity } from '../categories/category.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, CategoryEntity]),
    AmazonModule,
  ],
  controllers: [SyncController],
  providers: [SyncService],
})
export class SyncModule {}
