import { Inject, Injectable, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IDeviceRepository } from '@device/domain/repository/device.repository.interface';
import { BioAuthCommand } from './bio-auth.command';
import { BioService } from 'src/device/domain/service/bio.service';

@Injectable()
@CommandHandler(BioAuthCommand)
export class BioAuthCommandHandler implements ICommandHandler<BioAuthCommand> {
  private readonly logger = new Logger(BioAuthCommandHandler.name);
  constructor(
    private bioService: BioService,
    @Inject('DeviceRepository') private deviceRepository: IDeviceRepository,
  ) {}

  async execute(command: BioAuthCommand): Promise<boolean> {
    const { signature, message } = command;

    // db 에서 public key 를 가져온다.
    // 가져온 public key 를 사용하여 signature 를 검증한다.
    // 검증된 결과를 반환한다.
    const publicKey = await this.deviceRepository.getPublicKey(
      command.uniqueId,
    );
    const isVerified = await this.bioService.verifySignature(
      publicKey,
      signature,
      message,
    );
    return isVerified;
  }
}
