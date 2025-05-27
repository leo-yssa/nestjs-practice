import { HttpException, HttpStatus } from '@nestjs/common';

export class PortoneApiException extends HttpException {
  constructor(message = 'Portone API 요청 실패', status = HttpStatus.BAD_REQUEST) {
    super(message, status);
  }
}

export class PortoneUnauthorizedException extends HttpException {
  constructor(message = 'Portone 인증 실패') {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}

export class PortoneNotFoundException extends HttpException {
  constructor(message = 'Portone 리소스를 찾을 수 없음') {
    super(message, HttpStatus.NOT_FOUND);
  }
}
