import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const Recaptcha = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const recaptcha = request.body.recaptcha;

    if (!recaptcha) {
      return null;
    }

    return {
      token: recaptcha.token,
      siteKey: recaptcha.siteKey,
      ipAddress: request.ip,
    };
  },
);
