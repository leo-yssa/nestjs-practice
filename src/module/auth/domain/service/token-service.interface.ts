import { TokenPairVO } from '@auth/domain/vo/auth.vo';
import { TokenPayloadVO, GenerateTokenPayloadVO } from '@auth/domain/vo/token-payload.vo';

export interface ITokenService {
  generateTokenPair(payloadVO: GenerateTokenPayloadVO): Promise<TokenPairVO>;
  validateRefreshToken(tokenPayloadVO: TokenPayloadVO): void;
}
