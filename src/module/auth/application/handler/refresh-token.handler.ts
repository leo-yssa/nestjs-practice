import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RefreshTokenCommand } from '@auth/application/command/refresh-token.command';
import { ITokenService } from '@auth/domain/service/token-service.interface';
import { TokenPairVO } from '@auth/domain/vo/auth.vo';

@Injectable()
@CommandHandler(RefreshTokenCommand)
export class RefreshTokenCommandHandler implements ICommandHandler<RefreshTokenCommand> {
  constructor(@Inject('TokenService') private tokenService: ITokenService) {}

  async execute(command: RefreshTokenCommand): Promise<TokenPairVO> {
    const { tokenPayloadVO } = command;
    this.tokenService.validateRefreshToken(tokenPayloadVO);
    return this.tokenService.generateTokenPair({
      userId: tokenPayloadVO.userId,
      userType: tokenPayloadVO.userType,
    });
  }
}
