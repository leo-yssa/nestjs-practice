import { BaseEntity } from '@shared/entity/base.entity';
import { Column, Entity, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class UserAgreement extends BaseEntity {
  @Column()
  termsOfUse: boolean;

  @Column()
  marketingUse: boolean;

  @Column()
  personalInfoThirdParty: boolean;

  @Column()
  marketingConsent: boolean;

  @OneToOne(() => UserEntity, (user) => user.agreement)
  user: UserEntity;
}
