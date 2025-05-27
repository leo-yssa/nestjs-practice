import { BaseEntity } from '@shared/entity/base.entity';
import { PRODUCT_OPTION_SLOT_VALUE_TYPE, ProductOptionSlotValueType } from '@shared/type/product-option.type';
import { ProductEntity } from './product.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, Unique } from 'typeorm';
import { ProductOptionValueEntity } from './product-option-value.entity';

@Entity('product_option_slot')
@Unique('uq_product_option_slot_a', ['productId', 'slotIndex'])
export class ProductOptionSlotEntity extends BaseEntity {
  @Column({ type: 'smallint', comment: '옵션 슬롯 순서' })
  slotIndex: number;

  @Column({ type: 'enum', enum: PRODUCT_OPTION_SLOT_VALUE_TYPE, comment: '슬롯 값 타입' })
  slotValueType: ProductOptionSlotValueType;

  @Column({ type: 'varchar', length: 30, comment: '옵션 타이틀' })
  slotLabel: string;

  @ManyToOne(() => ProductEntity, { nullable: false })
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;
  @Column()
  productId: string;

  @OneToMany(() => ProductOptionValueEntity, (optionValue) => optionValue.productOptionSlotId)
  productOptionValues: ProductOptionValueEntity[];
}
