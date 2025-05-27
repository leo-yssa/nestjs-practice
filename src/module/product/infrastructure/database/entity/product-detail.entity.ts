import { BaseEntity } from '@shared/entity/base.entity';
import { CUSTOMER_INQUIRY_TYPE, CustomerInquiryType } from '@shared/type/product.type';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity('product_detail')
export class ProductDetailEntity extends BaseEntity {
  @Column({ type: 'varchar', comment: '주최사, 발행처' })
  organizer: string;

  @Column({ type: 'enum', enum: CUSTOMER_INQUIRY_TYPE, comment: '고객 문의 타입' })
  customerInquiryType: CustomerInquiryType;

  @Column({ type: 'varchar', comment: '고객 문의 창구 상세 정보 (e.g. 전화번호, url)' })
  customerInquiryValue: string;

  @Column({ type: 'varchar', comment: '운영 시간' })
  runningTime: string;

  @Column({ type: 'text', nullable: true, comment: '이용 조건' })
  useInfo: string;

  @Column({ type: 'text', nullable: true, comment: '공지 사항' })
  notice: string;

  @Column({ type: 'varchar', comment: '장소명' })
  locationName: string;

  @Column({ type: 'varchar', comment: '상세 주소' })
  locationAddress: string;

  @Column({ type: 'integer', comment: '반경' })
  radiusKm: number;

  @Column({ type: 'decimal', precision: 9, scale: 6, comment: '공연 장소 경도' })
  longitude: number;

  @Column({ type: 'decimal', precision: 8, scale: 6, comment: '공연 장소 위도' })
  latitude: number;

  @OneToOne(() => ProductEntity, { nullable: false })
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;
  @Column()
  productId: string;
}
