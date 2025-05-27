import { BaseEntity } from '@shared/entity/base.entity';
import { PRODUCT_CATEGORY, PRODUCT_STATUS, ProductCategory, ProductStatus } from '@shared/type/product.type';
import { Column, DeleteDateColumn, Entity, OneToMany, OneToOne } from 'typeorm';
import { ProductContentImageEntity } from './product-content-image.entity';
import { ProductOptionSlotEntity } from './product-option-slot.entity';
import { ProductOptionEntity } from './product-option.entity';
import { ProductDetailEntity } from './product-detail.entity';
import { ProductSaleSettingEntity } from './product-sale-setting.entity';

@Entity('product')
export class ProductEntity extends BaseEntity {
  @Column({ type: 'enum', enum: PRODUCT_STATUS, comment: '컬렉션 상태' })
  status: ProductStatus;

  @Column({ type: 'boolean', default: false, comment: '검수 완료 여부' })
  isVerified: boolean;

  @Column({ type: 'time with time zone', nullable: true, comment: '검수 완료 시간' })
  verifiedAt: Date;

  @Column({ type: 'varchar', nullable: true, comment: '컬렉션 주소' })
  address: string;

  @Column({ type: 'enum', enum: PRODUCT_CATEGORY, comment: '컬렉션 카테고리' })
  category: ProductCategory;

  @Column({ type: 'varchar', comment: '상품명' })
  title: string;

  @Column({ type: 'varchar', comment: '상품 설명' })
  description: string;

  @Column({ type: 'varchar' })
  symbol: string;

  @Column({ type: 'boolean', default: false, comment: '상품 노출 여부' })
  isDisplayed: boolean;

  @Column({ type: 'time with time zone', nullable: true, comment: '상품 노출 시작 시간' })
  displayStartAt: Date;

  @Column({ type: 'time with time zone', nullable: true, comment: '상품 노출 종료 시간' })
  displayEndAt: Date;

  @Column({ type: 'varchar', comment: '대표 이미지 URL(1:1)' })
  mainImageUrl: string;

  @Column({ type: 'boolean', default: false, comment: 'n차 거래 가능 여부' })
  isResalable: boolean;

  @DeleteDateColumn({ type: 'timestamp with time zone' })
  deletedAt: Date;

  @OneToMany(() => ProductContentImageEntity, (image) => image.product)
  productContentImages: ProductContentImageEntity[];

  @OneToMany(() => ProductOptionSlotEntity, (optionSlot) => optionSlot.product)
  productOptionSlots: ProductOptionSlotEntity[];

  @OneToOne(() => ProductSaleSettingEntity, (saleSetting) => saleSetting.product)
  productSaleSetting: ProductSaleSettingEntity;

  @OneToOne(() => ProductDetailEntity, (detail) => detail.product)
  productDetail: ProductDetailEntity;

  @OneToOne(() => ProductOptionEntity, (option) => option.product)
  productOption: ProductOptionEntity;
}
