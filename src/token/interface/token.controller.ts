import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SmsAuthDto } from './dto/sms-auth.dto';
import { CreateTokenDto } from './dto/create-token.dto';
import { CreateTokenCommand } from '../application/command/create-token.command';
import { SmsAuthCommand } from '../application/command/sms-auth.command';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PayloadDto } from 'src/dto/payload.dto';
import { Payload } from 'src/decorator/payload.decorator';
import { RefreshTokenCommand } from '../application/command/refresh-token.command';

@ApiTags('Token')
@Controller('tokens')
export class TokenController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Post('/sms')
  smsAuth(@Body() dto: SmsAuthDto) {
    return this.commandBus.execute(
      new SmsAuthCommand(dto.countryCode, dto.phoneNumber),
    );
  }

  @Post('/refresh')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  refresh(@Payload() dto: PayloadDto) {
    return this.commandBus.execute(
      new RefreshTokenCommand(dto.id, dto.type, dto.tokenType),
    );
  }

  @Post()
  create(@Body() dto: CreateTokenDto) {
    return this.commandBus.execute(
      new CreateTokenCommand(
        dto.id,
        dto.securityCode,
        dto.countryCode,
        dto.phoneNumber,
      ),
    );
  }

  @Get()
  findAll() {
    return;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return;
  }
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return;
  }
}
