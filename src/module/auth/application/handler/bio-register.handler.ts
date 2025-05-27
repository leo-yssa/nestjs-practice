import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BioRegisterCommand } from '@auth/application/command/bio-register.command';
import { UserPort } from '@auth/domain/port/user.port';

@Injectable()
@CommandHandler(BioRegisterCommand)
export class BioRegisterCommandHandler implements ICommandHandler<BioRegisterCommand> {
  constructor(@Inject('UserPort') private userPort: UserPort) {}

  async execute(command: BioRegisterCommand): Promise<void> {
    await this.userPort.updateUserDevicePublicKey({
      id: command.bioRegisterVo.id,
      devicePublicKey: command.bioRegisterVo.publicKey,
    });
  }
}
