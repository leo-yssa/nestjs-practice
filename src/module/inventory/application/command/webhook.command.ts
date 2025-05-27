import { ICommand } from '@nestjs/cqrs';
import { PortoneWebhookVO } from '@inventory/domain/vo/portone.vo';

export class WebhookCommand implements ICommand {
  constructor(public readonly vo: PortoneWebhookVO) {}
}
