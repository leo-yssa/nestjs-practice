import { Inject, Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserVO } from '@shared/vo/user.vo';
import { GetUserByPhoneNumberQuery } from '../query/get-user-by-phone-number.query';
import { IUserService } from '@user/domain/service/user-service.interface';
@Injectable()
@QueryHandler(GetUserByPhoneNumberQuery)
export class GetUserByPhoneNumberQueryHandler implements IQueryHandler<GetUserByPhoneNumberQuery> {
  constructor(@Inject('UserService') private userService: IUserService) {}

  async execute(query: GetUserByPhoneNumberQuery): Promise<UserVO> {
    return await this.userService.getUserByPhoneNumber(query.userPhoneNumberVo);
  }
}
