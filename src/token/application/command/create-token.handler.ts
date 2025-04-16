import { Inject, Injectable, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ITokenCache } from '@token/domain/cache/token.cache.interface';
import { TokenService } from '@token/domain/token.service';
import { Token } from '@token/domain/vo/token.vo';
import { CreateTokenCommand } from './create-token.command';

@Injectable()
@CommandHandler(CreateTokenCommand)
export class CreateTokenCommandHandler
  implements ICommandHandler<CreateTokenCommand>
{
  private readonly logger = new Logger(CreateTokenCommandHandler.name);
  constructor(
    private tokenService: TokenService,
    @Inject('TokenCache') private cache: ITokenCache,
  ) {}

  async execute(command: CreateTokenCommand): Promise<Token> {
    const { id, securityCode, countryCode, phoneNumber } = command;

    if (securityCode !== JSON.parse(await this.cache.get(id))) {
      throw new Error('invalid security code');
    }
    this.tokenService.publishCreateToken(
      id,
      securityCode,
      countryCode,
      phoneNumber,
    );

    return this.tokenService.generateTokenPair(id, 'Normal');
  }
}
