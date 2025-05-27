import { CheckoutInputVO } from '@inventory/domain/vo/checkout.vo';
import { ICommand } from '@nestjs/cqrs';

export class CheckoutCommand implements ICommand {
  constructor(readonly vo: CheckoutInputVO) {}
}
