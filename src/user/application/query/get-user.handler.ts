import { Inject, Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IUserRepository } from 'src/user/domain/repository/user.repository.interface';
import { GetUserQuery } from './get-user.query';
import { GetUserResultVO } from 'src/user/domain/vo/result/get-user.vo';
@Injectable()
@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(
    @Inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  async execute(query: GetUserQuery): Promise<GetUserResultVO> {
    return await this.userRepository.getUser(query.id);
  }
}
