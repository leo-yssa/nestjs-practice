import { OnEvent } from '@nestjs/event-emitter';
import { Inject, Injectable } from '@nestjs/common';
import { SmsAuthEvent } from '@auth/domain/event/sms-auth.event';
import { SmsProvider } from '@sms/sms.provider';
import { ExtendedLoggerService } from '@config/logger/extended-logger.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { SmsAuthEventVO } from '@auth/domain/vo/auth.vo';
@Injectable()
export class SmsAuthEventHandler {
  constructor(
    private readonly smsProvider: SmsProvider,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: ExtendedLoggerService,
  ) {
    this.logger.setContext(SmsAuthEventHandler.name);
  }
  @OnEvent('sms.auth', { async: true })
  async handleSmsAuth(event: SmsAuthEvent) {
    await this.sendSms(event.smsAuthEventVO);
  }
  async sendSms(smsAuthEventVO: SmsAuthEventVO): Promise<void> {
    try {
      return await this.smsProvider.send(
        smsAuthEventVO.phoneNumber,
        smsAuthEventVO.securityCode,
        smsAuthEventVO.callingCode,
      );
    } catch (e) {
      this.logger.error(e);
    }
  }
}
