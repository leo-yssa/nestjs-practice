import { IEvent } from '@nestjs/cqrs';

export class CreateUserEvent implements IEvent {
  readonly name: string;
  constructor(
    readonly id: string,
    readonly nickname: string,
  ) {
    this.name = CreateUserEvent.name;
  }
}
