import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '@shared/entity/base.entity';
import { CartEntity } from '@payment/infrastructure/database/entity/cart.entity';
import { ItemEntity } from '@item/infrastructure/database/entity/item.entity';

@Entity('items')
export class CartItemEntity extends BaseEntity {
  @ManyToOne(() => CartEntity, (cart) => cart.items)
  cart: CartEntity;

  @ManyToOne(() => ItemEntity, (item) => item.cartItems)
  item: ItemEntity;

  @Column()
  quantity: number;
}
