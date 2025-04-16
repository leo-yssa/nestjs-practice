import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PayloadDto } from '@shared/dto/payload.dto';
import { Payload } from '@shared/decorator/payload.decorator';
import { SmsAuthDto } from './dto/sms-auth.dto';
import { CreateTokenDto } from './dto/create-token.dto';
import { CreateTokenCommand } from '../application/command/create-token.command';
import { SmsAuthCommand } from '../application/command/sms-auth.command';
import { RefreshTokenCommand } from '../application/command/refresh-token.command';

@ApiTags('Token')
@Controller('tokens')
export class TokenController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Post('/sms')
  @ApiOperation({
    summary: 'SMS 인증 요청',
    description: '휴대폰 번호로 인증 코드를 요청합니다.',
  })
  @ApiResponse({
    status: 201,
    description: 'SMS 인증 요청 성공',
  })
  @ApiResponse({
    status: 400,
    description: '잘못된 요청 형식',
  })
  smsAuth(@Body() dto: SmsAuthDto) {
    return this.commandBus.execute(
      new SmsAuthCommand(dto.countryCode, dto.phoneNumber),
    );
  }

  @Post('/refresh')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: '토큰 갱신',
    description: '토큰을 갱신합니다.',
  })
  @ApiResponse({
    status: 201,
    description: '토큰 갱신 성공',
  })
  @ApiResponse({
    status: 401,
    description: '토큰 갱신 실패',
  })
  refresh(@Payload() dto: PayloadDto) {
    return this.commandBus.execute(
      new RefreshTokenCommand(dto.id, dto.type, dto.tokenType),
    );
  }

  @Post()
  @ApiOperation({
    summary: '토큰 생성',
    description: '토큰을 생성합니다.',
  })
  @ApiResponse({
    status: 201,
    description: '토큰 생성 성공',
  })
  @ApiResponse({
    status: 400,
    description: '잘못된 요청 형식',
  })
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
}
