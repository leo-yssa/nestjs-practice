import { UserVO } from '../user.vo';

export class GetUsersResultVO {
  constructor(
    private readonly users: UserVO[],
    private readonly total: number,
    private readonly page: number,
    private readonly limit: number,
  ) {}

  get getUsers(): UserVO[] {
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
