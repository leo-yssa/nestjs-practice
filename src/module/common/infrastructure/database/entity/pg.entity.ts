import { BaseEntity } from '@shared/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('pg')
export class Pg extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 50,
    comment: '결제 타입 (BANK, CARD, CARD_HYUNDAI, PAYPAL 등)',
  })
  payType: string;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '결제 수단 이름 (현대카드, 카드, 계좌이체 등)',
  })
  payName: string;

  @Column({
    type: 'varchar',
    length: 50,
    comment: '결제 수단 (trans, card, paypal 등)',
  })
  payMethod: string;

  @Column({ type: 'varchar', length: 100, comment: '가맹점 ID' })
  merchantId: string;

  @Column({
    type: 'varchar',
    length: 100,
    comment: '가맹점 키',
    nullable: true,
  })
  merchantKey: string;

  @Column({
    type: 'varchar',
    length: 100,
    comment: '채널 키',
    nullable: true,
  })
  channelKey: string;

  @Column({ type: 'boolean', default: true, comment: '사용 여부' })
  isActive: boolean;
}
