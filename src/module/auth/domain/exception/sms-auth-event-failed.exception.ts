import { HttpException, HttpStatus } from '@nestjs/common';

export class SmsAuthEventFailedException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to emit sms auth event',
        error: 'SmsAuthEventFailedException',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
