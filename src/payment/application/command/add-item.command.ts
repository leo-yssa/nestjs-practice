import { ICommand } from '@nestjs/cqrs';

export class AddItemCommand implements ICommand {
  constructor(
    readonly userId: string,
    readonly itemId: string,
    readonly quantity: number,
  ) {}
}
