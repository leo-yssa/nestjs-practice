import { BaseEntity } from '@shared/entity/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity('product_content_images')
export class ProductContentImageEntity extends BaseEntity {
  @Column({ type: 'smallint', comment: '이미니 노출 순서' })
  sortOrder: number;

  @Column({ type: 'varchar', comment: '이미지 경로' })
  imageUrl: string;

  @ManyToOne(() => ProductEntity, (product) => product.productContentImages, { nullable: false })
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;
  @Column()
  productId: string;
}
