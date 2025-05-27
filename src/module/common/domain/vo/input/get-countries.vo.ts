import { PaginationInputVO } from '@shared/vo/pagination.vo';

export class GetCountriesInputVO {
  constructor(
    public readonly pagination: PaginationInputVO,
    public readonly name?: string,
    public readonly callingCode?: string,
  ) {
    this.validate();
  }

  validate() {}
}
