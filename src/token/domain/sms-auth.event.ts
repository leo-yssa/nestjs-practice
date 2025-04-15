import { IEvent } from '@nestjs/cqrs';

export class SmsAuthEvent implements IEvent {
  readonly name: string;
  constructor(
    readonly id: string,
    readonly securityCode: string,
    readonly countryCode: number,
    readonly phoneNumber: string,
  ) {
    this.name = SmsAuthEvent.name;
  }
}
