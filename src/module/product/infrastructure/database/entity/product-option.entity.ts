import { BaseEntity } from '@shared/entity/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { ProductOptionValueEntity } from './product-option-value.entity';
import { ProductEntity } from './product.entity';
/*
상품의 option 갯수는 3개를 초과하지 않는다는 기획을 기준으로 생성됨
option slot에 적인 옵션 값들의 조합으로 이루어짐
*/
@Entity('product_option')
export class ProductOptionEntity extends BaseEntity {
  @ManyToOne(() => ProductOptionValueEntity, { nullable: false })
  @JoinColumn({ name: 'option1_value_id' })
  option1Value: ProductOptionValueEntity;
  @Column({ comment: '옵션 1 값 ID' })
  option1ValueId: string;

  @ManyToOne(() => ProductOptionValueEntity, { nullable: true })
  @JoinColumn({ name: 'option2_value_id' })
  option2Value: ProductOptionValueEntity;
  @Column({ nullable: true, comment: '옵션 2 값 ID' })
  option2ValueId: string;

  @ManyToOne(() => ProductOptionValueEntity, { nullable: true })
  @JoinColumn({ name: 'option3_value_id' })
  option3Value: ProductOptionValueEntity;
  @Column({ nullable: true, comment: '옵션 3 값 ID' })
  option3ValueId: string;

  @Column({ type: 'boolean', default: true, comment: '옵션 활성화 여부' })
  isActive: boolean;

  @Column({ type: 'integer', comment: '인당 최대 구매 수량' })
  maxPurchaseQuantity: number;

  @Column({ type: 'integer', comment: '판매 수량' })
  saleQuantity: number;

  @Column({ type: 'timestamp with time zone', comment: '판매 시작일' })
  saleStartAt: Date;

  @Column({ type: 'timestamp with time zone', comment: '판매 종료일' })
  saleEndAt: Date;

  @Column({ type: 'timestamp with time zone', comment: '사용 시작일' })
  useStartAt: Date;

  @Column({ type: 'timestamp with time zone', comment: '사용 종료일' })
  useEndAt: Date;

  @Column({ type: 'numeric', precision: 12, scale: 2, nullable: true, comment: '가격' })
  price: number;

  @OneToOne(() => ProductEntity, { nullable: false })
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;
  @Column()
  productId: string;
}
