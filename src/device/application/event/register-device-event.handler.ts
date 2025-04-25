import { Inject, Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { RegisterDeviceEvent } from '@device/domain/event/register-device.event';
import { IDeviceRepository } from '@device/domain/repository/device.repository.interface';
import { RegisterDeviceInputVO } from '@device/domain/vo/input/register-device.vo';

@EventsHandler(RegisterDeviceEvent)
export class RegisterDeviceEventHandler
  implements IEventHandler<RegisterDeviceEvent>
{
  private readonly logger = new Logger(RegisterDeviceEventHandler.name);
  constructor(
    @Inject('DeviceRepository') private deviceRepository: IDeviceRepository,
  ) {}
  async handle(event: RegisterDeviceEvent): Promise<void> {
    const { id, securityCode, countryCode, phoneNumber } = event;
    this.logger.log(
      `CreateTokenEvent received - id: ${id}, code: ${securityCode}, country: ${countryCode}, phone: ${phoneNumber}`,
    );
    await this.deviceRepository.register(
      plainToInstance(RegisterDeviceInputVO, event),
    );
  }
}
