import { ICommand } from '@nestjs/cqrs';
import { TokenPayloadVO } from '@auth/domain/vo/token-payload.vo';

export class RefreshTokenCommand implements ICommand {
  constructor(public readonly tokenPayloadVO: TokenPayloadVO) {}
}
