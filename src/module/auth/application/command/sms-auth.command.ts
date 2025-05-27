import { ICommand } from '@nestjs/cqrs';
import { SmsAuthVO } from '@auth/domain/vo/auth.vo';

export class SmsAuthCommand implements ICommand {
  constructor(public readonly smsAuthVo: SmsAuthVO) {}
}
