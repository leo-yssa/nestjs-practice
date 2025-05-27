import { ICommand } from '@nestjs/cqrs';
import { PortoneCallbackVO } from '@inventory/domain/vo/portone.vo';

export class CallbackCommand implements ICommand {
  constructor(public readonly vo: PortoneCallbackVO) {}
}
