import { ICommand } from '@nestjs/cqrs';
import { UpdateUserDeviceInputVO } from '@shared/vo/user.vo';

export class UpdateUserDeviceCommand implements ICommand {
  constructor(readonly updateUserDeviceInputVo: UpdateUserDeviceInputVO) {}
}
