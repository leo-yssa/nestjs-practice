import { Inject, Injectable, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { IDeviceRepository } from '@device/domain/repository/device.repository.interface';
import { RegisterDeviceInputVO } from '@device/domain/vo/input/register-device.vo';
import { RegisterDeviceResultVO } from '@device/domain/vo/result/register-device.vo';
import { RegisterDeviceCommand } from './register-device.command';

@Injectable()
@CommandHandler(RegisterDeviceCommand)
export class RegisterDeviceCommandHandler
  implements ICommandHandler<RegisterDeviceCommand>
{
  private readonly logger = new Logger(RegisterDeviceCommandHandler.name);
  constructor(
    @Inject('DeviceRepository') private deviceRepository: IDeviceRepository,
  ) {}

  async execute(
    command: RegisterDeviceCommand,
  ): Promise<RegisterDeviceResultVO> {
    return await this.deviceRepository.register(
      plainToInstance(RegisterDeviceInputVO, command),
    );
  }
}
