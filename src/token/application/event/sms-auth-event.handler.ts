import { OnEvent } from '@nestjs/event-emitter';
import { Injectable, Logger } from '@nestjs/common';
import { SmsAuthEvent } from '@token/domain/sms-auth.event';

@Injectable()
export class SmsAuthEventHandler {
  private readonly logger = new Logger(SmsAuthEventHandler.name);

  @OnEvent('sms.auth', { async: true })
  async handleSmsAuth(event: SmsAuthEvent) {
    const { id, securityCode, countryCode, phoneNumber } = event;
    this.logger.log(
      `Created: ${id}, ${securityCode}, ${countryCode}, ${phoneNumber}`,
    );

    // ex) SMS 발송, 메일 전송, 로그 저장 등 비동기 부수 효과 처리
  }
}
