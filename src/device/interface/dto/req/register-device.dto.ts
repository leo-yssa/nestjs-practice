import { ApiProperty } from '@nestjs/swagger';

export class RegisterDeviceRequestDto {
  @ApiProperty({ description: '디바이스 고유 식별자' })
  uniqueId: string;

  @ApiProperty({ description: '디바이스 운영체제', example: 'ios' })
  os: string;

  @ApiProperty({ description: '디바이스 모델', example: 'iPhone 13' })
  model: string;

  @ApiProperty({
    description: '공개키',
    example:
      'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA7dbMu0jwVQnikYnnWh8UF4Px3Oi0VdjIIS4r4/t6B4sRwrFgJLs2GmvxWl1ZhwbasziYXh6F0OJX9JM/pRGpyhA0RdL1eUrD2MQJ58hj2+rhQe90LPGawx7wjaFr+FB71kp2MXtUjSXTeBvoKCCU/FmbRR7tFm36O7jnBuqBwrH+8sq3iMY5ffoQV1JyVI+7Fknhvpw+KshT+/Uit/zG5rAD0M4ldlh7r2Eq3Cr7wVZLqAD1GbMAuGYfdaYTXywuXCeidres/dbLgikrWZRg0/8DWo+BXrz/4F/JIOXRUqbtsXHfZdTGtAze1USJWPR+z6ZBV741iPhgedTBmgB4aQIDAQAB',
  })
  publicKey: string;
  @ApiProperty({ description: '사용자 ID', example: '사용자 ID' })
  userId: string;
}
