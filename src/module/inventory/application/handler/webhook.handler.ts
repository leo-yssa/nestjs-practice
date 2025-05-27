import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { WebhookCommand } from '@inventory/application/command/webhook.command';
import { IOrderService } from '@inventory/domain/service/order-service.interface';

@Injectable()
@CommandHandler(WebhookCommand)
export class WebhookCommandHandler implements ICommandHandler<WebhookCommand> {
  constructor(
    @Inject('OrderService')
    private readonly orderService: IOrderService,
  ) {}

  async execute(command: WebhookCommand): Promise<void> {
    return await this.orderService.webhook(command.vo);
  }
}
