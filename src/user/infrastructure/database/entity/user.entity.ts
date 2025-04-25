import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { DeviceEntity } from '@device/infrastructure/database/entity/device.entity';
import { BaseEntity } from '@shared/entity/base.entity';
import { CartEntity } from '@payment/infrastructure/database/entity/cart.entity';
import { OrderEntity } from '@payment/infrastructure/database/entity/order.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column()
  phoneNumber: string;

  @OneToMany(() => DeviceEntity, (device) => device.userId, {
    cascade: false,
  })
  @JoinColumn({ name: 'id', referencedColumnName: 'user_id' })
  devices: DeviceEntity[];

  @OneToOne(() => CartEntity, (cart) => cart.user)
  cart: CartEntity;

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: OrderEntity[];
}
