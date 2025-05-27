import { ICommand } from '@nestjs/cqrs';
import { LoginWithSmsVO } from '@auth/domain/vo/auth.vo';

export class LoginWithSmsCommand implements ICommand {
  constructor(readonly loginWithSmsVo: LoginWithSmsVO) {}
}
