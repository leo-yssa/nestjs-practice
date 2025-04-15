import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PayloadDto } from 'src/dto/payload.dto';

export const Payload = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): PayloadDto => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);