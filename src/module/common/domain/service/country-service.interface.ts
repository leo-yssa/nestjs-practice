import { GetCountriesResultVO } from '@common/domain/vo/result/get-countries.vo';
import { GetCountryQuery } from '@common/application/query/get-country.query';

export interface ICountryService {
  getCountry(query: GetCountryQuery): Promise<GetCountriesResultVO>;
}
