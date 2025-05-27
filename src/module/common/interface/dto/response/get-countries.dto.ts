import { ApiProperty } from '@nestjs/swagger';
import { PaginationResponseDto } from '@shared/dto/pagination.dto';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CountryDto } from '../countries.dto';

export class GetCountriesResponseDto {
  @ApiProperty({
    description: '국가 목록',
    type: [CountryDto],
  })
  countries: CountryDto[];

  @ApiProperty({
    description: '페이지네이션 정보',
    type: PaginationResponseDto,
  })
  @ValidateNested()
  @Type(() => PaginationResponseDto)
  pagination: PaginationResponseDto;
}
