import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({
    description: 'HTTP 상태 코드',
    example: 400,
  })
  statusCode: number;

  @ApiProperty({
    description: '에러 메시지',
    example: '잘못된 요청입니다.',
  })
  message: string;

  @ApiProperty({
    description: '에러 타입',
    example: 'BadRequestException',
  })
  error: string;

  @ApiProperty({
    description: '에러 발생 시간',
    example: '2024-03-14T12:00:00Z',
  })
  timestamp: string;

  @ApiProperty({
    description: '에러 발생 경로',
    example: '/api/v1/users',
  })
  path: string;
}
