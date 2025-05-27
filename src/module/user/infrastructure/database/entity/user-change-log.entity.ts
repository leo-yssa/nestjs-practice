import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '@shared/entity/base.entity';
import { UserEntity } from './user.entity';

@Entity('user_change_log')
export class UserChangeLog extends BaseEntity {
  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @Column()
  adminId: string;

  @Column()
  changedField: string;

  @Column()
  changedAt: Date;

  @Column()
  changeReason: string;
}
