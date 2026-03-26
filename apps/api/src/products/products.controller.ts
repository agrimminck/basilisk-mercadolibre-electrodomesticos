import { Controller, Get, Param, Query } from '@nestjs/common'
import { ProductsService } from './products.service'
import type { Product } from '@affiliate-gaming/shared'

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  FindAll(@Query('category') category?: string): Promise<Product[]> {
    return this.productsService.FindAll(category)
  }

  @Get(':slug')
  FindBySlug(@Param('slug') slug: string): Promise<Product> {
    return this.productsService.FindBySlug(slug)
  }
}
