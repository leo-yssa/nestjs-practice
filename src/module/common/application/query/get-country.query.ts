import { IQuery } from '@nestjs/cqrs';
import { GetCountriesInputVO } from '@common/domain/vo/input/get-countries.vo';

export class GetCountryQuery implements IQuery {
  constructor(public readonly getCountriesInputVO: GetCountriesInputVO) {}
}
