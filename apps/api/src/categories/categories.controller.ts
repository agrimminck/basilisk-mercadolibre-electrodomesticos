import { Controller, Get, Param } from '@nestjs/common'
import { CategoriesService } from './categories.service'
import type { Category } from '@affiliate-gaming/shared'

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  FindAll(): Promise<Category[]> {
    return this.categoriesService.FindAll()
  }

  @Get(':slug')
  FindBySlug(@Param('slug') slug: string): Promise<Category> {
    return this.categoriesService.FindBySlug(slug)
  }
}
