import { ulid } from 'ulid';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ITokenCache } from 'src/token/domain/cache/token.cache.interface';
import { TokenService } from 'src/token/domain/token.service';
import { SmsAuthCommand } from './sms-auth.command';

@Injectable()
@CommandHandler(SmsAuthCommand)
export class SmsAuthCommandHandler implements ICommandHandler<SmsAuthCommand> {
  private readonly logger = new Logger(SmsAuthCommandHandler.name);
  constructor(
    private tokenService: TokenService,
    @Inject('TokenCache') private cache: ITokenCache,
  ) {}

  async execute(command: SmsAuthCommand): Promise<string> {
    const { countryCode, phoneNumber } = command;
    const id = ulid();
    const securityCode = this.generateSecurityCode();
    await this.cache.create(id, securityCode, 180);
    this.tokenService.publishSmsAuthEvent(
      id,
      securityCode,
      countryCode,
      phoneNumber,
    );
    return id;
  }

  generateSecurityCode(): string {
    return Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join(
      '',
    );
  }
}
