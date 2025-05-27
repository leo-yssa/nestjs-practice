import { ApiProperty } from '@nestjs/swagger';
import { PaginationRequestDto } from '@shared/dto/pagination.dto';
import { IsString, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class GetCountriesRequestDto {
  @ApiProperty({
    description: '페이지네이션 정보',
    type: PaginationRequestDto,
    required: false,
  })
  @ValidateNested()
  @Type(() => PaginationRequestDto)
  pagination?: PaginationRequestDto = new PaginationRequestDto();

  @ApiProperty({
    description: '국가명 검색 (영문/한글)',
    required: false,
    example: '대한민국',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: '국제 전화 코드 검색',
    required: false,
    example: '82',
  })
  @IsOptional()
  @IsString()
  callingCode?: string;
}
