import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ProductEntity } from './product.entity'
import type { ProductEntity as Product } from './product.entity'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async FindAll(categorySlug?: string): Promise<Product[]> {
    const query = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .where('product.available = :available', { available: true })
      .orderBy('product.rating', 'DESC', 'NULLS LAST')

    if (categorySlug) {
      query.andWhere('category.slug = :slug', { slug: categorySlug })
    }

    return query.getMany()
  }

  async FindBySlug(slug: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { slug },
      relations: ['category'],
    })
    if (!product) {
      throw new NotFoundException(`Product '${slug}' not found`)
    }
    return product
  }
}
