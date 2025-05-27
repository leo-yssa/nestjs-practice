import { IQuery } from '@nestjs/cqrs';

export class GetUsersQuery implements IQuery {
  constructor(
    readonly limit: number,
    readonly page: number,
  ) {}
}
