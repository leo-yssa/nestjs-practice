import { Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '@shared/entity/base.entity';
import { ProductOrderEntity } from '@inventory/infrastructure/database/entity/product-order.entity';
import { ProductItemEntity } from '@inventory/infrastructure/database/entity/product-item.entity';

@Entity('product_order_item')
// @Unique('uq_product_order_item_a', ['orderId', 'itemId'])
export class ProductOrderItemEntity extends BaseEntity {
  @ManyToOne(() => ProductOrderEntity, (order) => order.items)
  order: ProductOrderEntity;

  @ManyToOne(() => ProductItemEntity, (item) => item.productOrderItems)
  item: ProductItemEntity;
}
