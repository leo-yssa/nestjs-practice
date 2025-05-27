import { HttpException, HttpStatus } from '@nestjs/common';

export class TokenGenerateFailedException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Token generate failed',
        error: 'TokenGenerateFailedException',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
