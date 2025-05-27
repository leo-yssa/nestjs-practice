import { BaseEntity } from '@shared/entity/base.entity';
import { Column, Entity, Unique } from 'typeorm';

@Entity('product_stock')
@Unique('uq_product_stock_a', ['productOptionId'])
export class ProductStockEntity extends BaseEntity {
  @Column({ type: 'uuid', comment: '상품 옵션 ID' })
  productOptionId: string;

  @Column({ type: 'integer', comment: '구매 가능한 수량' })
  available: number;

  @Column({ type: 'integer', comment: '구매 예약된 수량' })
  hold: number;

  @Column({ type: 'integer', comment: '판매 완료된 수량' })
  sold: number;
}
