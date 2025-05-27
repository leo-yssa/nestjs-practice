import { BaseEntity } from '@shared/entity/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { UserEntity } from '@user/infrastructure/database/entity/user.entity';

@Entity('user_wallet')
export class UserWalletEntity extends BaseEntity {
  @Column({ comment: '네트워크' })
  network: string;

  @Column({ comment: '주소' })
  address: string;

  @ManyToOne(() => UserEntity, (user) => user.wallets)
  user: UserEntity;
}
