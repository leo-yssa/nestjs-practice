export class Token {
  constructor(
    private readonly accessToken: string,
    private readonly refreshToken: string,
  ) {}
}
