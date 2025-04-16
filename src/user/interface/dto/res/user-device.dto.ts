import { ApiProperty } from '@nestjs/swagger';

export class UserDeviceResponseDto {
  @ApiProperty({
    description: '디바이스 ID',
    example: 'device-123',
  })
  id: string;

  @ApiProperty({
    description: '디바이스 이름',
    example: 'iPhone 13 Pro',
  })
  deviceName: string;

  @ApiProperty({
    description: '마지막 접속 시간',
    example: '2024-01-15T12:00:00Z',
  })
  lastAccessedAt: Date;
}
