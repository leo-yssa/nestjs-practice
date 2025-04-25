import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '@shared/entity/base.entity';
import { UserEntity } from '@user/infrastructure/database/entity/user.entity';
import { OrderItemEntity } from './order-item.entity';

@Entity('items')
export class OrderEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.orders)
  user: UserEntity;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order, {
    cascade: true,
  })
  items: OrderItemEntity[];
}
