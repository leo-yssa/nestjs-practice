import { IEvent } from '@nestjs/cqrs';
import { SmsAuthEventVO } from '@auth/domain/vo/auth.vo';
export class SmsAuthEvent implements IEvent {
  readonly name: string;
  constructor(readonly smsAuthEventVO: SmsAuthEventVO) {
    this.name = SmsAuthEvent.name;
  }
}
