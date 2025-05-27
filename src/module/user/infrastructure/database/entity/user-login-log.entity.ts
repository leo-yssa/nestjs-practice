import { Entity, ManyToOne, Column } from 'typeorm';
import { BaseEntity } from '@shared/entity/base.entity';
import { UserEntity } from '@user/infrastructure/database/entity/user.entity';

@Entity('user_login_log')
export class UserLoginLog extends BaseEntity {
  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @Column()
  ip: string;

  @Column()
  os: string;

  @Column()
  browser: string;

  @Column()
  loginTime: Date;

  @Column()
  referer: string;
}
