import { Inject, Injectable } from '@nestjs/common';
import { ICountryService } from '@common/domain/service/country-service.interface';
import { ICountryRepository } from '@common/domain/repository/country-repository.interface';
import { GetCountryQuery } from '@common/application/query/get-country.query';
import { GetCountriesResultVO } from '@common/domain/vo/result/get-countries.vo';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ExtendedLoggerService } from '@config/logger/extended-logger.service';

@Injectable()
export class CountryService implements ICountryService {
  constructor(
    @Inject('CountryRepository')
    private readonly countryRepository: ICountryRepository,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: ExtendedLoggerService,
  ) {
    this.logger.setContext(CountryService.name);
  }

  async getCountry(query: GetCountryQuery): Promise<GetCountriesResultVO> {
    this.logger.log(query.getCountriesInputVO);
    return this.countryRepository.getCountry(query.getCountriesInputVO);
  }
}
