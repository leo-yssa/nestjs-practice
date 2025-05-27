import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CallbackCommand } from '@inventory/application/command/callback.command';
import { IOrderService } from '@inventory/domain/service/order-service.interface';

@Injectable()
@CommandHandler(CallbackCommand)
export class CallbackCommandHandler implements ICommandHandler<CallbackCommand> {
  constructor(
    @Inject('OrderService')
    private readonly orderService: IOrderService,
  ) {}

  async execute(command: CallbackCommand): Promise<void> {
    return await this.orderService.callback(command.vo);
  }
}
