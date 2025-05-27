import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ITokenService } from '@auth/domain/service/token-service.interface';
import { UserPort } from '@auth/domain/port/user.port';
import { ExtendedLoggerService } from '@config/logger/extended-logger.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { TokenPairVO } from '@auth/domain/vo/auth.vo';
import { LoginWithSmsCommand } from '@auth/application/command/login-with-sms.command';
import { IAuthService } from '@auth/domain/service/auth-service.interface';
import { SecurityCodeVO } from '@auth/domain/vo/auth.vo';
import { AuthExceptionFactory } from '@auth/application/exception/auth-exception.factory';
@Injectable()
@CommandHandler(LoginWithSmsCommand)
export class LoginWithSmsCommandHandler implements ICommandHandler<LoginWithSmsCommand> {
  constructor(
    @Inject('AuthService') private authService: IAuthService,
    @Inject('TokenService') private tokenService: ITokenService,
    @Inject('UserPort') private userPort: UserPort,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: ExtendedLoggerService,
  ) {
    this.logger.setContext(LoginWithSmsCommandHandler.name);
  }

  async execute(command: LoginWithSmsCommand): Promise<TokenPairVO> {
    const { loginWithSmsVo } = command;

    if (
      !(await this.authService.validateSecurityCode({
        id: loginWithSmsVo.id,
        securityCode: loginWithSmsVo.securityCode,
      } as SecurityCodeVO))
    ) {
      throw AuthExceptionFactory.createInvalidSecurityCodeException();
    }
    const user = await this.userPort.getUserByPhoneNumber({
      phoneNumber: loginWithSmsVo.phoneNumber,
    });
    if (!user) {
      // 회원가입 프로세스 진행
      // const newUser = await this.userPort.createUser({
      //   phoneNumber: loginWithSmsVo.phoneNumber,
      //   callingCode: loginWithSmsVo.callingCode,
      //   role: 'Normal',
      // } as CreateUserInputVO);
      // this.logger.debug(
      //   `New user created - id: ${newUser.id}, phoneNumber: ${newUser.phoneNumber}, callingCode: ${newUser.callingCode}, status: ${newUser.status}`,
      // );
    }

    return this.tokenService.generateTokenPair({
      userId: user.id,
      userType: 'Normal',
    });
  }
}
