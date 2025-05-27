import { BaseEntity } from '@shared/entity/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, Unique } from 'typeorm';
import { ProductOptionSlotEntity } from './product-option-slot.entity';
import { ProductOptionEntity } from './product-option.entity';

@Entity('product_option_value')
@Unique('uq_product_option_value_a', ['productOptionSlotId', 'valueIndex'])
export class ProductOptionValueEntity extends BaseEntity {
  @Column({ type: 'smallint', comment: '옵션 값 순서' })
  valueIndex: number;

  @Column({ type: 'varchar', nullable: true, comment: '옵션 문자열 값' })
  valueString: string;

  @Column({ type: 'timestamp with time zone', nullable: true, comment: '옵션 날짜 값' })
  valueDate: Date;

  @Column({ type: 'numeric', precision: 12, scale: 2, comment: '옵션 개별 가격' })
  price: number;

  @ManyToOne(() => ProductOptionSlotEntity, { nullable: false })
  @JoinColumn({ name: 'product_option_slot_id' })
  productOptionSlot: ProductOptionSlotEntity;
  @Column()
  productOptionSlotId: string;

  @OneToMany(() => ProductOptionEntity, (productOption) => productOption.option1Value)
  option1ProductOptions: ProductOptionEntity[];

  @OneToMany(() => ProductOptionEntity, (productOption) => productOption.option2Value)
  option2ProductOptions: ProductOptionEntity[];

  @OneToMany(() => ProductOptionEntity, (productOption) => productOption.option3Value)
  option3ProductOptions: ProductOptionEntity[];
}
