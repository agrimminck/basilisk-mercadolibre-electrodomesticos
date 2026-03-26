import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { CategoryEntity } from '../categories/category.entity'

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  asin: string

  @Column()
  name: string

  @Column({ unique: true })
  slug: string

  @Column({ type: 'text' })
  description: string

  @Column({ default: '' })
  imageUrl: string

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number

  @Column({ default: 'USD' })
  currency: string

  @Column()
  affiliateUrl: string

  @Column({ type: 'uuid' })
  categoryId: string

  @Column({ type: 'decimal', precision: 3, scale: 1, nullable: true })
  rating: number | null

  @Column({ type: 'int', nullable: true })
  reviewCount: number | null

  @Column({ default: true })
  available: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(() => CategoryEntity, (cat) => cat.products)
  @JoinColumn({ name: 'categoryId' })
  category: CategoryEntity
}
