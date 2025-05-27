import { BaseEntity } from '@shared/entity/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { ProductOrderItemEntity } from '@inventory/infrastructure/database/entity/product-order-item.entity';
import { ITEM_STATUS, ItemStatusType } from '@shared/type/inventory.type';

@Entity('product_item')
export class ProductItemEntity extends BaseEntity {
  @Column({ type: 'enum', enum: ITEM_STATUS })
  status: ItemStatusType;

  @Column()
  blockStatus: string;

  @Column({ type: 'uuid', comment: '상품 ID' })
  productId: string;

  @Column({ type: 'uuid', comment: '상품 옵션 ID' })
  productOptionId: string;

  @Column()
  tokenId: string;

  @Column()
  ownerId: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToMany(() => ProductOrderItemEntity, (productOrderItem) => productOrderItem.item)
  productOrderItems: ProductOrderItemEntity[];
}
