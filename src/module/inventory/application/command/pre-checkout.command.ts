import { PreCheckoutInputVO } from '@inventory/domain/vo/checkout.vo';
import { ICommand } from '@nestjs/cqrs';

export class PreCheckoutCommand implements ICommand {
  constructor(readonly vo: PreCheckoutInputVO) {}
}
