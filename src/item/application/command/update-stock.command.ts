import { ICommand } from '@nestjs/cqrs';

export class UpdateStockCommand implements ICommand {
  constructor(
    readonly itemId: string,
    readonly stock: number,
  ) {}
}
