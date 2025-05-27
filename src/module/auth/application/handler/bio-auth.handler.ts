import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BioAuthCommand } from '@auth/application/command/bio-auth.command';
import { UserPort } from '@auth/domain/port/user.port';
import { IBioService } from '@auth/domain/service/bio-service.interface';

@Injectable()
@CommandHandler(BioAuthCommand)
export class BioAuthCommandHandler implements ICommandHandler<BioAuthCommand> {
  constructor(
    @Inject('UserPort') private userPort: UserPort,
    @Inject('BioService') private bioService: IBioService,
  ) {}

  async execute(command: BioAuthCommand): Promise<boolean> {
    const { bioAuthVo } = command;

    // db 에서 public key 를 가져온다.
    // 가져온 public key 를 사용하여 signature 를 검증한다.
    // 검증된 결과를 반환한다.
    const publicKey = await this.userPort.getUserDevicePublicKey(bioAuthVo.id);
    const isVerified = await this.bioService.verifySignature(bioAuthVo, publicKey);
    return isVerified;
  }
}
