import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '@shared/entity/base.entity';
import { OrderEntity } from '@payment/infrastructure/database/entity/order.entity';
import { ItemEntity } from '@item/infrastructure/database/entity/item.entity';

@Entity('items')
export class OrderItemEntity extends BaseEntity {
  @ManyToOne(() => OrderEntity, (order) => order.items)
  order: OrderEntity;

  @ManyToOne(() => ItemEntity, (item) => item.orderItems)
  item: ItemEntity;

  @Column()
  quantity: number;

  @Column('decimal')
  priceAtPurchase: number;
}
