import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SmsAuthCommandHandler } from './application/command/sms-auth.handler';
import { TokenController } from './interface/token.controller';
import { TokenCache } from './infrastructure/cache/token.cache';
import { TokenService } from './domain/token.service';
import { SmsAuthEventHandler } from './application/event/sms-auth-event.handler';
import { CreateTokenCommandHandler } from './application/command/create-token.handler';
import { RefreshTokenCommandHandler } from './application/command/refresh-token.handler';

const commandHandlers = [
  SmsAuthCommandHandler,
  CreateTokenCommandHandler,
  RefreshTokenCommandHandler,
];
const eventHandlers = [SmsAuthEventHandler];

@Module({
  imports: [CqrsModule],
  controllers: [TokenController],
  providers: [
    ...commandHandlers,
    ...eventHandlers,
    {
      provide: 'TokenCache',
      useClass: TokenCache,
    },
    TokenService,
    Logger,
  ],
})
export class TokenModule {}
