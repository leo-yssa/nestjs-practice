import { BaseEntity } from '@shared/entity/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { OrderItemEntity } from '@payment/infrastructure/database/entity/order-item.entity';
import { CartItemEntity } from '@payment/infrastructure/database/entity/cart-item.entity';
@Entity('items')
export class ItemEntity extends BaseEntity {
  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column()
  stock: number;

  @OneToMany(() => CartItemEntity, (cartItem) => cartItem.item)
  cartItems: CartItemEntity[];

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.item)
  orderItems: OrderItemEntity[];
}
