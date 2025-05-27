import { BaseEntity } from '@shared/entity/base.entity';
import { Column, Entity, Index, Unique } from 'typeorm';

@Entity('country')
@Unique('uq_country_name_en_a', ['countryNameEn'])
@Unique('uq_country_name_kr_a', ['countryNameKr'])
@Index('idx_country_calling_code_a', ['countryCallingCode']) // 국제 전화 코드 검색 인덱스 (중복 데이터 있음)
export class CountryEntity extends BaseEntity {
  @Column({
    name: 'country_name_en',
    length: 100,
    comment: '국가명 (영문)',
  })
  countryNameEn: string;

  @Column({
    name: 'country_name_kr',
    length: 100,
    comment: '국가명 (한글)',
  })
  countryNameKr: string;

  @Column({
    name: 'country_calling_code',
    length: 10,
    comment: '국제 전화 코드',
  })
  countryCallingCode: string;

  @Column({
    name: 'country_code',
    length: 2,
    comment: '국가 코드 (ISO 3166-1 alpha-2)',
  })
  countryCode: string;

  @Column({
    name: 'currency_code',
    length: 3,
    comment: '통화 코드 (ISO 4217)',
  })
  currencyCode: string;
}
