import { ApiProperty } from '@nestjs/swagger';
import { GetUserResponseDto } from './get-user.dto';

export class GetUsersResponseDto {
  @ApiProperty({
    description: '사용자 목록',
    type: [GetUserResponseDto],
  })
  users: GetUserResponseDto[];

  @ApiProperty({
    description: '전체 사용자 수',
    example: 100,
  })
  total: number;

  @ApiProperty({
    description: '현재 페이지',
    example: 1,
  })
  page: number;

  @ApiProperty({
    description: '페이지당 항목 수',
    example: 10,
  })
  limit: number;

  @ApiProperty({
    description: '전체 페이지 수',
    example: 10,
  })
  totalPages: number;

  @ApiProperty({
    description: '다음 페이지 존재 여부',
    example: true,
  })
  hasNext: boolean;
}
