export class TokenPayload {
  constructor(
    private readonly id: string,
    private readonly type: string,
    private readonly tokenType: 'access' | 'refresh',
  ) {}

  static create(
    id: string,
    type: string,
    tokenType: 'access' | 'refresh',
  ): TokenPayload {
    return new TokenPayload(id, type, tokenType);
  }

  toPlainObject() {
    return {
      id: this.id,
      type: this.type,
      tokenType: this.tokenType,
    };
  }
}
