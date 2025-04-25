import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '@shared/entity/base.entity';
import { UserEntity } from '@user/infrastructure/database/entity/user.entity';
import { CartItemEntity } from './cart-item.entity';

@Entity('items')
export class CartEntity extends BaseEntity {
  @OneToOne(() => UserEntity, (user) => user.cart)
  @JoinColumn()
  user: UserEntity;

  @OneToMany(() => CartItemEntity, (cartItem) => cartItem.cart, {
    cascade: true,
  })
  items: CartItemEntity[];
}
