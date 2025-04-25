import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { UserVO } from '@shared/vo/user.vo';
import { GetUserQuery } from '@user/application/query/get-user.query';
import { IUserPort } from '@payment/domain/port/user.port';

@Injectable()
export class UserAdapter implements IUserPort {
  constructor(private readonly queryBus: QueryBus) {}

  async getUserById(id: string): Promise<UserVO> {
    return this.queryBus.execute(new GetUserQuery(id));
  }
}
