import { BaseEntity } from '@shared/entity/base.entity';
import { PRODUCT_SALE_STATUS, PRODUCT_SALE_TYPE, ProductSaleStatus, ProductSaleType } from '@shared/type/product.type';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity('product_sale_setting')
export class ProductSaleSettingEntity extends BaseEntity {
  @Column({ type: 'enum', enum: PRODUCT_SALE_TYPE, comment: '판매 타입' })
  saleType: ProductSaleType;

  @Column({ type: 'enum', enum: PRODUCT_SALE_STATUS, default: PRODUCT_SALE_STATUS.PENDING, comment: '판매 상태' })
  saleStatus: ProductSaleStatus;

  @Column({ type: 'time with time zone', comment: '판매 시작 시간' })
  saleStartAt: Date;

  @Column({ type: 'time with time zone', comment: '판매 종료 시간' })
  saleEndAt: Date;

  @Column({ type: 'smallint', nullable: true, comment: '구매 제한 연령' })
  ageLimit: number;

  @Column({ type: 'boolean', default: false, comment: '즉시 사용 가능 여부' })
  isImmediateUse: boolean;

  @Column({ type: 'integer', comment: '최대 구매 수량' })
  maxPurchaseQuantity: number;

  @Column({ type: 'integer', comment: '옵션 갯수' })
  optionCount: number;

  @Column({ type: 'boolean', default: false, comment: '옵션별 판매 금액 설정 가능 여부' })
  isOptionPriceEnabled: boolean;

  @OneToOne(() => ProductEntity, { nullable: false })
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;
  @Column()
  productId: string;
}
