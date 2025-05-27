import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UAParser } from 'ua-parser-js';

export interface ClientInfo {
  ip: string;
  os: string;
  browser: string;
}

export const ClientInfo = createParamDecorator((data: unknown, ctx: ExecutionContext): ClientInfo => {
  const request = ctx.switchToHttp().getRequest();

  // IP 추출
  const ip =
    (request.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    request.connection.remoteAddress ||
    request.ip;

  // User-Agent 파싱
  const ua = new UAParser(request.headers['user-agent']).getResult();

  return {
    ip: ip?.replace('::ffff:', '') || '',
    os: ua.os.name || '',
    browser: ua.browser.name || '',
  };
});
