import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IOrderService } from '@inventory/domain/service/order-service.interface';
import { CheckoutCommand } from '@inventory/application/command/checkout.command';

@Injectable()
@CommandHandler(CheckoutCommand)
export class CheckoutCommandHandler implements ICommandHandler<CheckoutCommand> {
  constructor(
    @Inject('OrderService')
    private readonly orderService: IOrderService,
  ) {}

  async execute(command: CheckoutCommand) {
    const { vo } = command;
    return await this.orderService.checkout(vo);
  }
}
