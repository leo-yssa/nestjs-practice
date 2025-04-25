import { ICommand } from '@nestjs/cqrs';

export class RegisterDeviceCommand implements ICommand {
  constructor(
    readonly uniqueId: string,
    readonly os: string,
    readonly model: string,
    readonly publicKey: string,
    readonly userId: string,
  ) {}
}
