import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { UserDeviceEntity } from './user-device.entity';

@Entity('user')
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  phoneNumber: string;

  @OneToMany(() => UserDeviceEntity, (userDevice) => userDevice.userId, {
    cascade: false,
  })
  @JoinColumn({ name: 'id', referencedColumnName: 'user_id' })
  devices: UserDeviceEntity[];
}
