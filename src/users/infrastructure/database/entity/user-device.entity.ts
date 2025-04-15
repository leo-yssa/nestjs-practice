import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('user_device')
export class UserDeviceEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  type: string;

  @Column()
  name: string;

  @Column()
  publicKey: string;

  @Column()
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.devices, { cascade: false })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;
}
