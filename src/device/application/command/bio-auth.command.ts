import { ICommand } from '@nestjs/cqrs';

export class BioAuthCommand implements ICommand {
  constructor(
    readonly uniqueId: string,
    readonly signature: string,
    readonly message: string,
  ) {}
}
