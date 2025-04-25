import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { ulid } from 'ulid';
import { IDeviceRepository } from '@device/domain/repository/device.repository.interface';
import { DeviceEntity } from '../entity/device.entity';
import { RegisterDeviceInputVO } from '@device/domain/vo/input/register-device.vo';
import { RegisterDeviceResultVO } from '@device/domain/vo/result/register-device.vo';

@Injectable()
export class DeviceRepository implements IDeviceRepository {
  constructor(
    private datasource: DataSource,
    @InjectRepository(DeviceEntity)
    private deviceRepository: Repository<DeviceEntity>,
  ) {}
  async register(
    device: RegisterDeviceInputVO,
  ): Promise<RegisterDeviceResultVO> {
    const deviceEntity = plainToInstance(DeviceEntity, device);
    deviceEntity.id = ulid();
    const result = await this.deviceRepository.save(deviceEntity);
    return plainToInstance(RegisterDeviceResultVO, result);
  }

  async getPublicKey(uniqueId: string): Promise<string> {
    const result = await this.deviceRepository.findOne({
      where: { uniqueId },
    });
    return result.publicKey;
  }
}
