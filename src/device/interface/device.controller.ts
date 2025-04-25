import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BioAuthCommand } from '../application/command/bio-auth.command';
import { BioAuthRequestDto } from './dto/req/bio-auth.dto';
import { RegisterDeviceRequestDto } from './dto/req/register-device.dto';
import { RegisterDeviceCommand } from '@device/application/command/register-device.command';
import { plainToInstance } from 'class-transformer';

@ApiTags('Device')
@Controller('devices')
export class DeviceController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Post()
  @ApiOperation({
    summary: '기기 등록',
    description: '기기 등록 시 기기 정보를 등록합니다.',
  })
  async register(@Body() dto: RegisterDeviceRequestDto) {
    return this.commandBus.execute(plainToInstance(RegisterDeviceCommand, dto));
  }

  @Post('/bio')
  @ApiOperation({
    summary: '생체 인증 요청',
    description: '생체 인증을 요청합니다.',
  })
  async bioAuth(@Body() dto: BioAuthRequestDto) {
    return this.commandBus.execute(plainToInstance(BioAuthCommand, dto));
  }
}
