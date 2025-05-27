import { GetCountriesInputVO } from '@common/domain/vo/input/get-countries.vo';
import { GetCountriesResultVO } from '@common/domain/vo/result/get-countries.vo';

export interface ICountryRepository {
  getCountry(getCountriesInputVO: GetCountriesInputVO): Promise<GetCountriesResultVO>;
}
