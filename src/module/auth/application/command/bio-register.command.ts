import { BioRegisterVO } from '@auth/domain/vo/auth.vo';
import { ICommand } from '@nestjs/cqrs';

export class BioRegisterCommand implements ICommand {
  constructor(public readonly bioRegisterVo: BioRegisterVO) {}
}
