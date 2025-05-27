import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidTokenTypeException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Invalid token type',
        error: 'InvalidTokenTypeException',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
