import { UnauthorizedException } from '@nestjs/common';
import { ICommand } from '@nestjs/cqrs';

export class RefreshTokenCommand implements ICommand {
  constructor(
    readonly id: string,
    readonly type: string,
    readonly tokenType: string,
  ) {
    this.validate();
  }
  validate() {
    if (this.tokenType !== 'refresh') {
      throw new UnauthorizedException('invalid token type');
    }
  }
}
