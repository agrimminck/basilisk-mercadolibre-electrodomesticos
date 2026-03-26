import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { ProductEntity } from '../products/product.entity'

@Entity('categories')
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  name: string

  @Column({ unique: true })
  slug: string

  @Column({ type: 'text', nullable: true })
  description: string | null

  @Column({ type: 'uuid', nullable: true })
  parentId: string | null

  @OneToMany(() => ProductEntity, (product) => product.category)
  products: ProductEntity[]
}
