import { ICommand } from '@nestjs/cqrs';
import { BioAuthVO } from '@auth/domain/vo/auth.vo';

export class BioAuthCommand implements ICommand {
  constructor(readonly bioAuthVo: BioAuthVO) {}
}
