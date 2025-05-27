import { Inject, Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from './get-user.query';
import { UserVO } from '@shared/vo/user.vo';
import { IUserRepository } from '@user/domain/repository/user-repository.interface';
@Injectable()
@QueryHandler(GetUserQuery)
export class GetUserQueryHandler implements IQueryHandler<GetUserQuery> {
  constructor(@Inject('UserRepository') private userRepository: IUserRepository) {}

  async execute(query: GetUserQuery): Promise<UserVO> {
    return await this.userRepository.getUser(query.id);
  }
}
