import { ApiProperty } from '@nestjs/swagger';

// Country DTO
export class CountryDto {
  @ApiProperty({ description: '국가 ID', example: 'KR' })
  id: string;

  @ApiProperty({ description: '국가명 (영문)', example: 'South Korea' })
  countryNameEn: string;

  @ApiProperty({ description: '국가명 (한글)', example: '대한민국' })
  countryNameKr: string;

  @ApiProperty({ description: '국제 전화 코드', example: '82' })
  countryCallingCode: string;

  @ApiProperty({ description: '국가 코드', example: 'KR' })
  countryCode: string;

  @ApiProperty({ description: '통화 코드', example: 'KRW' })
  currencyCode: string;

  @ApiProperty({ description: '생성일', example: '2024-05-12T00:00:00Z' })
  createdAt: string;

  @ApiProperty({ description: '수정일', example: '2024-05-12T00:00:00Z' })
  updatedAt: string;
}
