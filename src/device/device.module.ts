import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceController } from './interface/device.controller';
import { DeviceRepository } from './infrastructure/database/repository/device.repository';
import { DeviceEntity } from './infrastructure/database/entity/device.entity';
import { RegisterDeviceCommandHandler } from './application/command/register-device.handler';
import { BioAuthCommandHandler } from './application/command/bio-auth.handler';
import { BioService } from './domain/service/bio.service';
const commandHandlers = [RegisterDeviceCommandHandler, BioAuthCommandHandler];
const queryHandlers = [];
const eventHandlers = [];
const repositories = [
  {
    provide: 'DeviceRepository',
    useClass: DeviceRepository,
  },
];
const caches = [];
const services = [BioService];
@Module({
  imports: [TypeOrmModule.forFeature([DeviceEntity]), CqrsModule],
  controllers: [DeviceController],
  providers: [
    ...commandHandlers,
    ...queryHandlers,
    ...eventHandlers,
    ...repositories,
    ...caches,
    ...services,
    Logger,
  ],
})
export class DeviceModule {}
