import { IEvent } from '@nestjs/cqrs';

export class UserCreatedEvent implements IEvent {
  readonly name: string;
  constructor(
    readonly id: string,
    readonly securityCode: string,
    readonly countryCode: number,
    readonly phoneNumber: string,
  ) {
    this.name = UserCreatedEvent.name;
  }
}
