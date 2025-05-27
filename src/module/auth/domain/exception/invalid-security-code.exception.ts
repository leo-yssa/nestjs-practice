import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidSecurityCodeException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Invalid security code',
        error: 'InvalidSecurityCodeException',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
