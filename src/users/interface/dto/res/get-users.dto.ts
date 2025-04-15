import { UserDto } from '../user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class GetUsersResponseDto {
  @ApiProperty({ type: [UserDto] })
  users: UserDto[];

  @ApiProperty({ description: '전체 사용자 수' })
  total: number;

  @ApiProperty({ description: '현재 페이지 번호' })
  page: number;

  @ApiProperty({ description: '페이지당 항목 수' })
  limit: number;

  @ApiProperty({ description: '전체 페이지 수' })
  totalPages: number;

  @ApiProperty({ description: '다음 페이지 존재 여부' })
  hasNext: boolean;
}
