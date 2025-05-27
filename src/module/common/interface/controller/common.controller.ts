import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { GetCountryQuery } from '@common/application/query/get-country.query';
import { GetCountriesInputVO } from '@common/domain/vo/input/get-countries.vo';
import { GetCountriesResponseDto } from '@common/interface/dto/response/get-countries.dto';
import { GetCountriesRequestDto } from '@common/interface/dto/request/get-countries.dto';
import { ApiErrorResponse } from '@shared/decorator/api-error-response.decorator';
@ApiTags('common')
@Controller('common')
export class CommonController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('/country')
  @ApiOperation({ summary: '국가 목록 조회' })
  @ApiResponse({
    status: 200,
    description: '국가 목록 조회 성공',
    type: GetCountriesResponseDto,
  })
  @ApiErrorResponse()
  async getCountry(@Query() dto: GetCountriesRequestDto): Promise<GetCountriesResponseDto> {
    return plainToInstance(
      GetCountriesResponseDto,
      await this.queryBus.execute(
        plainToInstance(GetCountryQuery, {
          getCountriesInputVO: plainToInstance(GetCountriesInputVO, dto),
        }),
      ),
    );
  }
}
