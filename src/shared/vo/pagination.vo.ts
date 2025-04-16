export class PaginationVO {
  constructor(
    private readonly page: number,
    private readonly limit: number,
  ) {
    this.validate();
  }

  private validate() {
    if (this.page < 1) throw new Error('Page must be greater than 0');
    if (this.limit < 1) throw new Error('Limit must be greater than 0');
  }

  get skip(): number {
    return (this.page - 1) * this.limit;
  }

  get getLimit(): number {
    return this.limit;
  }

  get getPage(): number {
    return this.page;
  }
}
