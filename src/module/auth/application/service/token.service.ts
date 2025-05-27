import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { GenerateTokenPayloadVO, TokenPayloadVO } from '@auth/domain/vo/token-payload.vo';
import { ITokenService } from '@auth/domain/service/token-service.interface';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ExtendedLoggerService } from '@config/logger/extended-logger.service';
import { TokenPairVO } from '@auth/domain/vo/auth.vo';
import { AuthExceptionFactory } from '@auth/application/exception/auth-exception.factory';
import { TOKEN_TYPE } from '@shared/type/token.type';

@Injectable()
export class TokenService implements ITokenService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: ExtendedLoggerService,
  ) {
    this.logger.setContext(TokenService.name);
  }

  async generateTokenPair(payloadVO: GenerateTokenPayloadVO): Promise<TokenPairVO> {
    try {
      const [accessToken, refreshToken] = await Promise.all([
        this.jwtService.signAsync(
          TokenPayloadVO.create(payloadVO.userId, payloadVO.userType, TOKEN_TYPE.ACCESS).toPlainObject(),
          {
            expiresIn: this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRATION'),
          },
        ),
        this.jwtService.signAsync(
          TokenPayloadVO.create(payloadVO.userId, payloadVO.userType, TOKEN_TYPE.REFRESH).toPlainObject(),
          {
            expiresIn: this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION'),
          },
        ),
      ]);
      return { accessToken, refreshToken };
    } catch (e) {
      this.logger.error(e);
      throw AuthExceptionFactory.createTokenGenerationFailedException();
    }
  }

  validateRefreshToken(tokenPayloadVO: TokenPayloadVO): void {
    if (tokenPayloadVO.tokenType !== TOKEN_TYPE.REFRESH) {
      throw AuthExceptionFactory.createInvalidTokenTypeException();
    }
  }
}
