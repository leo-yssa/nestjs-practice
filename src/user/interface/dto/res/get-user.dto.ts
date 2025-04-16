import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { UserDeviceResponseDto } from './user-device.dto';

export class GetUserResponseDto {
  @ApiProperty({
    description: '사용자 ID',
    example: '01ABCD...',
  })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({
    description: '휴대폰 번호',
    example: '01012345678',
  })
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    description: '사용자의 디바이스 목록',
    type: [UserDeviceResponseDto],
    required: false,
  })
  devices?: UserDeviceResponseDto[];
}
