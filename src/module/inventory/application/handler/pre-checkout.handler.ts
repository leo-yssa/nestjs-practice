import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IOrderService } from '@inventory/domain/service/order-service.interface';
import { PreCheckoutCommand } from '@inventory/application/command/pre-checkout.command';

@Injectable()
@CommandHandler(PreCheckoutCommand)
export class PreCheckoutCommandHandler implements ICommandHandler<PreCheckoutCommand> {
  constructor(
    @Inject('OrderService')
    private readonly orderService: IOrderService,
  ) {}

  async execute(command: PreCheckoutCommand) {
    const { vo } = command;
    return await this.orderService.preCheckout(vo);
  }
}
