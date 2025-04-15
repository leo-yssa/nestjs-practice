import { ICommand } from '@nestjs/cqrs';

export class CreateTokenCommand implements ICommand {
  constructor(
    readonly id: string,
    readonly securityCode: string,
    readonly countryCode: number,
    readonly phoneNumber: string,
  ) {}
}
