import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ConfirmCommand } from '@inventory/application/command/confirm.command';
import { IOrderService } from '@inventory/domain/service/order-service.interface';

@Injectable()
@CommandHandler(ConfirmCommand)
export class ConfirmCommandHandler implements ICommandHandler<ConfirmCommand> {
  constructor(
    @Inject('OrderService')
    private readonly orderService: IOrderService,
  ) {}

  async execute(command: ConfirmCommand): Promise<void> {
    return await this.orderService.confirm(command.vo);
  }
}
