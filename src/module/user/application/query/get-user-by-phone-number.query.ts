import { IQuery } from '@nestjs/cqrs';
import { UserPhoneNumberVO } from '@shared/vo/user.vo';

export class GetUserByPhoneNumberQuery implements IQuery {
  constructor(public readonly userPhoneNumberVo: UserPhoneNumberVO) {}
}
