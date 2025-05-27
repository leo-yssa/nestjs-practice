import { PaginationResultVO } from '@shared/vo/pagination.vo';
import { CountryVO } from '../country.vo';

export class GetCountriesResultVO {
  constructor(
    public readonly countries: CountryVO[],
    public readonly pagination: PaginationResultVO,
  ) {}
}
