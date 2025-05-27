import { TokenType } from '@shared/type/token.type';

export class TokenPayloadVO {
  constructor(
    public readonly userId: string,
    public readonly userType: string,
    public readonly tokenType: TokenType,
  ) {}

  static create(userId: string, userType: string, tokenType: TokenType): TokenPayloadVO {
    return new TokenPayloadVO(userId, userType, tokenType);
  }

  toPlainObject() {
    return {
      userId: this.userId,
      userType: this.userType,
      tokenType: this.tokenType,
    };
  }
}

export type GenerateTokenPayloadVO = Pick<TokenPayloadVO, 'userId' | 'userType'>;
