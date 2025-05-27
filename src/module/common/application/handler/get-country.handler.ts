import { Inject, Injectable, Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ICountryService } from '@common/domain/service/country-service.interface';
import { GetCountriesResultVO } from '@common/domain/vo/result/get-countries.vo';
import { GetCountryQuery } from '@common/application/query/get-country.query';

@Injectable()
@QueryHandler(GetCountryQuery)
export class GetCountryQueryHandler implements IQueryHandler<GetCountryQuery> {
  private readonly logger = new Logger(GetCountryQueryHandler.name);
  constructor(
    @Inject('CountryService')
    private readonly countryService: ICountryService,
  ) {}

  async execute(query: GetCountryQuery): Promise<GetCountriesResultVO> {
    return await this.countryService.getCountry(query);
  }
}
