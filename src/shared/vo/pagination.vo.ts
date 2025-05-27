export class PaginationInputVO {
  constructor(
    public readonly page: number,
    public readonly limit: number,
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
}

export class PaginationResultVO {
  constructor(
    public readonly total: number,
    public readonly page: number,
    public readonly limit: number,
    public readonly totalPages: number,
  ) {}
}
