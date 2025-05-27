import { ICommand } from '@nestjs/cqrs';
import { CreateUserInputVO } from '@shared/vo/user.vo';

export class CreateUserCommand implements ICommand {
  constructor(readonly createUserInputVo: CreateUserInputVO) {}
}
