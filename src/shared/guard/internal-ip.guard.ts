import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class InternalIpGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const ip =
      (request.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      request.connection.remoteAddress ||
      request.ip;

    const allowedSubnets = ['192.168.', '10.', '127.0.0.1', '::1'];

    const isAllowed = allowedSubnets.some((prefix) => ip.startsWith(prefix));

    if (!isAllowed) {
      throw new ForbiddenException('내부망에서만 접근 가능합니다.');
    }

    return true;
  }
}
