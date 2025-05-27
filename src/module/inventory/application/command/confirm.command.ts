import { ICommand } from '@nestjs/cqrs';
import { PortoneConfirmVO } from '@inventory/domain/vo/portone.vo';

export class ConfirmCommand implements ICommand {
  constructor(public readonly vo: PortoneConfirmVO) {}
}
