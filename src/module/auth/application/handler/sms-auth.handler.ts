import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IAuthService } from '@auth/domain/service/auth-service.interface';
import { SmsAuthCommand } from '@auth/application/command/sms-auth.command';
import { SmsAuthEventVO } from '@auth/domain/vo/auth.vo';
@Injectable()
@CommandHandler(SmsAuthCommand)
export class SmsAuthCommandHandler implements ICommandHandler<SmsAuthCommand> {
  constructor(@Inject('AuthService') private authService: IAuthService) {}

  async execute(command: SmsAuthCommand): Promise<string> {
    const { smsAuthVo } = command;
    const { id, securityCode } = this.authService.generateSecurityCode();
    await this.authService.saveSecurityCode({ id, securityCode });
    this.authService.emitSmsAuthEvent({ id, securityCode, ...smsAuthVo } as SmsAuthEventVO);
    return id;
  }
}
