import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '@shared/entity/base.entity';
import { ProductOrderEntity } from '@inventory/infrastructure/database/entity/product-order.entity';
import { UserWalletEntity } from '@user/infrastructure/database/entity/user-wallet.entity';
import { UserAgreement } from '@user/infrastructure/database/entity/user-agreement.entity';
import { UserDeviceEntity } from '@user/infrastructure/database/entity/user-device.entity';
import { USER_TYPE, UserType } from '@shared/type/user.type';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column({ nullable: true, comment: '닉네임' })
  nickname: string;

  @Column({ nullable: true, comment: '이메일' })
  email: string;

  @Column({
    length: 10,
    comment: '국제 전화 코드',
  })
  countryCallingCode: string;

  @Column({ comment: '전화번호' })
  phoneNumber: string;

  @Column({ nullable: true, comment: '생년월일' })
  birthDate: Date;

  @Column({ default: false, comment: '본인 인증 여부' })
  isVerified: boolean;

  @Column({ nullable: true, comment: '본인 인증 방법' })
  verificationMethod: string;

  @Column({ nullable: true, comment: '본인 인증 일시' })
  verificationDate: Date;

  @Column({ type: 'enum', enum: USER_TYPE, comment: '유형' })
  type: UserType;

  @Column({ default: 'ACTIVE', comment: '상태' })
  status: string;

  @Column({ nullable: true, comment: '비활성화 사유' })
  inactiveReason: string;

  @Column({ nullable: true, comment: '정지 사유' })
  suspendedReason: string;

  // 회원 구분 내국인/외국인 주민등록번호로 확인하나? 1,2,3,4(내국인), 5,6,7,8(외국인)
  @Column({ nullable: true, comment: '국적' })
  nationality: string;

  @OneToMany(() => UserWalletEntity, (wallet) => wallet.user)
  wallets: UserWalletEntity[];

  @OneToOne(() => UserAgreement, (agreement) => agreement.user)
  agreement: UserAgreement;

  @OneToMany(() => UserDeviceEntity, (device) => device.userId, {
    cascade: false,
  })
  @JoinColumn({ name: 'id', referencedColumnName: 'user_id' })
  devices: UserDeviceEntity[];

  @OneToMany(() => ProductOrderEntity, (order) => order.user)
  orders: ProductOrderEntity[];
}
