import { ICommand } from '@nestjs/cqrs';

export class CreateUserCommand implements ICommand {
  constructor(
    readonly id: string,
    readonly securityCode: string,
    readonly countryCode: number,
    readonly phoneNumber: string,
  ) {}
}
