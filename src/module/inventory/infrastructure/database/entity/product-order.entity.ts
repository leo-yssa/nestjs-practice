import { Entity, ManyToOne, OneToMany, Column } from 'typeorm';
import { BaseEntity } from '@shared/entity/base.entity';
import { UserEntity } from '@user/infrastructure/database/entity/user.entity';
import { ProductOrderItemEntity } from '@inventory/infrastructure/database/entity/product-order-item.entity';
import {
  PAYMENT_STATUS,
  SETTLEMENT_STATUS,
  PaymentStatusType,
  SettlementStatusType,
} from '@shared/type/inventory.type';

@Entity('product_order')
export class ProductOrderEntity extends BaseEntity {
  @Column({ type: 'smallint', comment: '주문 수량' })
  quantity: number;

  @Column({ type: 'numeric', precision: 12, scale: 2, nullable: true, comment: '구매 시 가격' })
  priceAtPurchase: number;

  @Column({ default: PAYMENT_STATUS.READY, type: 'enum', enum: PAYMENT_STATUS, comment: '결제 상태' })
  paymentStatus: PaymentStatusType;

  @Column({ default: SETTLEMENT_STATUS.READY, type: 'enum', enum: SETTLEMENT_STATUS, comment: '정산 상태' })
  settlementStatus: SettlementStatusType;

  @Column({ nullable: true, comment: '결제 방법' })
  payMethod: string;

  @Column({ nullable: true, comment: '주문 확정 여부' })
  isOrderConfirmed: boolean;

  @Column({ nullable: true, comment: '성인 확인 여부' })
  isAdultConfirmed: boolean;

  @Column({ nullable: true, comment: '환불 정책 동의 여부' })
  isRefundPolicyConfirmed: boolean;

  @Column({ nullable: true, comment: '개인정보 동의 여부' })
  isPrivacyPolicyConfirmed: boolean;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  user: UserEntity;

  @OneToMany(() => ProductOrderItemEntity, (orderItem) => orderItem.order, {
    cascade: true,
  })
  items: ProductOrderItemEntity[];

  @Column({ nullable: true, comment: '결제 아이디' })
  paymentId: string;

  @Column({
    type: 'time with time zone',
    nullable: true,
    comment: '결제 완료 시간',
  })
  paidAt: Date;

  @Column({
    type: 'time with time zone',
    nullable: true,
    comment: '결제 취소 시간',
  })
  cancelledAt: Date;

  @Column({
    type: 'time with time zone',
    nullable: true,
    comment: '결제 취소 이유',
  })
  cancelReason: string;

  @Column({
    type: 'time with time zone',
    nullable: true,
    comment: '정산 완료 시간',
  })
  settledAt: Date;
}
