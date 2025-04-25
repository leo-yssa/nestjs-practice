import { Inject, Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetUsersQuery } from './get-users.query';
import { IUserRepository } from '@user/domain/repository/user.repository.interface';
import { GetUsersResultVO } from '@user/domain/vo/result/get-users.vo';
import { GetUsersInputVO } from '@user/domain/vo/input/get-users.vo';
@Injectable()
@QueryHandler(GetUsersQuery)
export class GetUsersQueryHandler implements IQueryHandler<GetUsersQuery> {
  constructor(
    @Inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  async execute(query: GetUsersQuery): Promise<GetUsersResultVO> {
    return await this.userRepository.getUsers(
      plainToInstance(GetUsersInputVO, query),
    );
  }
}
