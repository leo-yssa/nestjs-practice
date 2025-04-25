import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '@shared/entity/base.entity';
import { UserEntity } from '@user/infrastructure/database/entity/user.entity';

@Entity('devices')
export class DeviceEntity extends BaseEntity {
  @Column()
  uniqueId: string;

  @Column()
  os: string;

  @Column()
  model: string;

  @Column('text')
  publicKey: string;

  @Column()
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.devices, { cascade: false })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;
}
