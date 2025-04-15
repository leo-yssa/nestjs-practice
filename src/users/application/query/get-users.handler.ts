import { Inject, Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUsersQuery } from './get-users.query';
import { IUserRepository } from 'src/users/domain/repository/user.repository.interface';
import { GetUsersResultVO } from 'src/users/domain/vo/result/get-users.vo';
import { plainToInstance } from 'class-transformer';
import { GetUsersInputVO } from 'src/users/domain/vo/input/get-users.vo';
@Injectable()
@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(
    @Inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  async execute(query: GetUsersQuery): Promise<GetUsersResultVO> {
    return await this.userRepository.getUsers(
      plainToInstance(GetUsersInputVO, query),
    );
  }
}
