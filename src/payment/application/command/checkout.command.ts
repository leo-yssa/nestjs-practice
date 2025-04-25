import { ICommand } from '@nestjs/cqrs';

export class CheckoutCommand implements ICommand {
  constructor(readonly userId: string) {}
}
