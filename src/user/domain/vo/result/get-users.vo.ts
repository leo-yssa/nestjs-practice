import { GetUserResultVO } from './get-user.vo';

export class GetUsersResultVO {
  constructor(
    private readonly users: GetUserResultVO[],
    private readonly total: number,
    private readonly page: number,
    private readonly limit: number,
  ) {}

  get getUsers(): GetUserResultVO[] {
    return this.users;
  }

  get getTotal(): number {
    return this.total;
  }

  get getPage(): number {
    return this.page;
  }

  get getLimit(): number {
    return this.limit;
  }

  get totalPages(): number {
    return Math.ceil(this.total / this.limit);
  }

  get hasNext(): boolean {
    return this.page < this.totalPages;
  }
}
