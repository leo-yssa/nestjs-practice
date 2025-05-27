import { Controller, Post, Body, UseGuards, Inject } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PayloadDto } from '@shared/dto/payload.dto';
import { Payload } from '@shared/decorator/payload.decorator';
import {
  TokenPairDto,
  SmsAuthDto,
  LoginWithSmsDto,
  AuthIdDto,
  BioRegisterDto,
  BioAuthDto,
} from '@auth/interface/dto/auth.dto';
import { LoginWithSmsCommand } from '@auth/application/command/login-with-sms.command';
import { SmsAuthCommand } from '@auth/application/command/sms-auth.command';
import { RefreshTokenCommand } from '@auth/application/command/refresh-token.command';
import { plainToInstance } from 'class-transformer';
import { SmsAuthVO, LoginWithSmsVO, BioRegisterVO } from '@auth/domain/vo/auth.vo';
import { TokenPayloadVO } from '@auth/domain/vo/token-payload.vo';
import { ClientInfo } from '@shared/decorator/client-info.decorator';
import { ExtendedLoggerService } from '@config/logger/extended-logger.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ApiErrorResponse } from '@shared/decorator/api-error-response.decorator';
import { BioRegisterCommand } from '@auth/application/command/bio-register.command';
import { BioAuthCommand } from '@auth/application/command/bio-auth.command';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: ExtendedLoggerService,
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {
    this.logger.setContext(AuthController.name);
  }

  @Post('/sms')
  @ApiOperation({
    summary: 'SMS 인증 요청',
    description: '휴대폰 번호로 인증 코드를 요청합니다.',
  })
  @ApiResponse({
    status: 201,
    description: 'SMS 인증 요청 성공',
    type: AuthIdDto,
  })
  @ApiErrorResponse()
  async smsAuth(@Body() dto: SmsAuthDto): Promise<AuthIdDto> {
    return {
      id: await this.commandBus.execute(
        plainToInstance(SmsAuthCommand, {
          smsAuthVo: {
            callingCode: dto.callingCode,
            phoneNumber: dto.phoneNumber,
          } as SmsAuthVO,
        }),
      ),
    } as AuthIdDto;
  }

  @Post('sms/login')
  @ApiOperation({
    summary: 'SMS 로그인',
    description: 'SMS로 발송된 인증번호를 통해 로그인을 합니다.',
  })
  @ApiResponse({
    status: 201,
    description: '로그인 성공',
    type: TokenPairDto,
  })
  @ApiErrorResponse()
  async loginWithSms(@Body() dto: LoginWithSmsDto, @ClientInfo() clientInfo: ClientInfo): Promise<TokenPairDto> {
    this.logger.log(JSON.stringify(clientInfo));
    return plainToInstance(
      TokenPairDto,
      await this.commandBus.execute(
        plainToInstance(LoginWithSmsCommand, {
          loginWithSmsVo: {
            id: dto.id,
            securityCode: dto.securityCode,
            callingCode: dto.callingCode,
            phoneNumber: dto.phoneNumber,
          } as LoginWithSmsVO,
        }),
      ),
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
    type: TokenPairDto,
  })
  @ApiErrorResponse()
  async refresh(@Payload() dto: PayloadDto): Promise<TokenPairDto> {
    return plainToInstance(
      TokenPairDto,
      await this.commandBus.execute(
        plainToInstance(RefreshTokenCommand, {
          tokenPayloadVO: {
            userId: dto.userId,
            userType: dto.userType,
            tokenType: dto.tokenType,
          } as TokenPayloadVO,
        }),
      ),
    );
  }

  @Post('/bio/register')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: '생체인증 등록',
    description: '생체인증을 등록합니다.',
  })
  @ApiResponse({
    status: 201,
    description: '생체인증 등록 성공',
    type: AuthIdDto,
  })
  @ApiErrorResponse()
  async register(@Payload() payloadDto: PayloadDto, @Body() bioDto: BioRegisterDto): Promise<AuthIdDto> {
    return {
      id: await this.commandBus.execute(
        plainToInstance(BioRegisterCommand, {
          bioRegisterVo: {
            id: payloadDto.userId,
            publicKey: bioDto.publicKey,
          } as BioRegisterVO,
        }),
      ),
    } as AuthIdDto;
  }

  @Post('/bio/auth')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: '생체인증 인증',
    description: '생체인증을 인증합니다.',
  })
  @ApiResponse({
    status: 201,
    description: '생체인증 인증 성공',
    type: AuthIdDto,
  })
  @ApiErrorResponse()
  async auth(@Payload() payloadDto: PayloadDto, @Body() bioDto: BioAuthDto): Promise<AuthIdDto> {
    return {
      id: await this.commandBus.execute(plainToInstance(BioAuthCommand, { bioAuthVo: bioDto })),
    } as AuthIdDto;
  }
}
