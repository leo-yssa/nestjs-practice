import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 as EventEmitter } from '@nestjs/event-emitter';
import { EventBus } from '@nestjs/cqrs';
import { SecurityCodeVO, SmsAuthEventVO } from '@auth/domain/vo/auth.vo';
import { IAuthService } from '@auth/domain/service/auth-service.interface';
import { ExtendedLoggerService } from '@config/logger/extended-logger.service';
import { SmsAuthEvent } from '@auth/domain/event/sms-auth.event';
import { AuthExceptionFactory } from '@auth/application/exception/auth-exception.factory';
import { ITokenService } from '@auth/domain/service/token-service.interface';
import { IAuthCache } from '@auth/domain/cache/auth-cache.interface';
import { ulid } from 'ulid';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private eventEmitter: EventEmitter,
    private eventBus: EventBus,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: ExtendedLoggerService,
    @Inject('AuthCache') private cache: IAuthCache,
    @Inject('TokenService') private tokenService: ITokenService,
  ) {
    this.logger.setContext(AuthService.name);
  }

  generateSecurityCode(): SecurityCodeVO {
    const id = ulid();
    const securityCode = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join('');
    return { id, securityCode };
  }

  async saveSecurityCode(securityCodeVO: SecurityCodeVO): Promise<void> {
    try {
      await this.cache.create(securityCodeVO.id, securityCodeVO.securityCode, 180);
    } catch (e) {
      this.logger.error(e);
      throw AuthExceptionFactory.createSecurityCodeStorageFailedException();
    }
  }

  emitSmsAuthEvent(smsAuthEventVO: SmsAuthEventVO): void {
    try {
      const event = new SmsAuthEvent(smsAuthEventVO);
      this.eventEmitter.emit('sms.auth', event);
    } catch (e) {
      this.logger.error(e);
      throw AuthExceptionFactory.createSmsAuthEventFailedException();
    }
  }

  async validateSecurityCode(securityCodeVO: SecurityCodeVO): Promise<boolean> {
    const cacheSecurityCode = JSON.parse(await this.cache.get(securityCodeVO.id));
    return securityCodeVO.securityCode === cacheSecurityCode;
  }
}
