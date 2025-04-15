import { ICommand } from '@nestjs/cqrs';

export class SmsAuthCommand implements ICommand {
  constructor(
    readonly countryCode: number,
    readonly phoneNumber: string,
  ) {}
}
