import { Injectable } from '@nestjs/common';
import { SmsAuthEvent } from './sms-auth.event';
import { EventEmitter2 as EventEmitter } from '@nestjs/event-emitter';
import { CreateTokenEvent } from './create-token.event';
import { EventBus } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './vo/token-payload.vo';
import { Token } from './vo/token.vo';

@Injectable()
export class TokenService {
  constructor(
    private eventEmitter: EventEmitter,
    private eventBus: EventBus,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  publishSmsAuthEvent(
    id: string,
    securityCode: string,
    countryCode: number,
    phoneNumber: string,
  ): void {
    const event = new SmsAuthEvent(id, securityCode, countryCode, phoneNumber);

    // 비동기 이벤트 발행
    this.eventEmitter.emit('sms.auth', event);
  }

  publishCreateToken(
    id: string,
    securityCode: string,
    countryCode: number,
    phoneNumber: string,
  ) {
    this.eventBus.publish(
      new CreateTokenEvent(id, securityCode, countryCode, phoneNumber),
    );
  }

  async generateTokenPair(id: string, type: string): Promise<Token> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        TokenPayload.create(id, type, 'access').toPlainObject(),
        {
          expiresIn: this.configService.get<string>(
            'JWT_ACCESS_TOKEN_EXPIRATION',
          ),
        },
      ),
      this.jwtService.signAsync(
        TokenPayload.create(id, type, 'refresh').toPlainObject(),
        {
          expiresIn: this.configService.get<string>(
            'JWT_REFRESH_TOKEN_EXPIRATION',
          ),
        },
      ),
    ]);
    return new Token(accessToken, refreshToken);
  }
}
