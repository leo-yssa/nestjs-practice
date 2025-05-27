import { HttpException, HttpStatus } from '@nestjs/common';

export class SecurityCodeStorageFailedException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to save security code',
        error: 'SecurityCodeStorageFailedException',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
