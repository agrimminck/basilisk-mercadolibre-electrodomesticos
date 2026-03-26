import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CategoryEntity } from './category.entity'
import type { CategoryEntity as Category } from './category.entity'

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async FindAll(): Promise<Category[]> {
    return this.categoryRepository.find({ order: { name: 'ASC' } })
  }

  async FindBySlug(slug: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { slug } })
    if (!category) {
      throw new NotFoundException(`Category '${slug}' not found`)
    }
    return category
  }
}
