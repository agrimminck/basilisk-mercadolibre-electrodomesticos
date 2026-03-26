import { Controller, Get, Param, Query } from '@nestjs/common'
import { ProductsService } from './products.service'
import type { ProductEntity as Product } from './product.entity'

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  FindAll(
    @Query('category') category?: string,
    @Query('q') q?: string,
  ): Promise<Product[]> {
    return this.productsService.FindAll(category, q)
  }

  @Get(':slug')
  FindBySlug(@Param('slug') slug: string): Promise<Product> {
    return this.productsService.FindBySlug(slug)
  }
}
