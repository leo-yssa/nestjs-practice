import { ApiProperty } from '@nestjs/swagger';

export class SmsAuthDto {
  @ApiProperty({ description: '국가 코드' })
  countryCode: number;
  @ApiProperty({ description: '휴대폰 번호' })
  phoneNumber: string;
}
