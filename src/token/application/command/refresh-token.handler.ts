import { Inject, Injectable, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ITokenCache } from '@token/domain/cache/token.cache.interface';
import { TokenService } from '@token/domain/token.service';
import { Token } from '@token/domain/vo/token.vo';
import { RefreshTokenCommand } from './refresh-token.command';

@Injectable()
@CommandHandler(RefreshTokenCommand)
export class RefreshTokenCommandHandler
  implements ICommandHandler<RefreshTokenCommand>
{
  private readonly logger = new Logger(RefreshTokenCommandHandler.name);
  constructor(
    private tokenService: TokenService,
    @Inject('TokenCache') private cache: ITokenCache,
  ) {}

  async execute(command: RefreshTokenCommand): Promise<Token> {
    this.logger.log('refresh token');
    const { id, type } = command;
    return this.tokenService.generateTokenPair(id, type);
  }
}
