import { HttpException, HttpStatus } from '@nestjs/common';

export class RecaptchaFailedException extends HttpException {
  constructor() {
    super('Recaptcha verification failed', HttpStatus.BAD_REQUEST);
  }
}

export class NotSupportedDeviceException extends HttpException {
  constructor() {
    super('Device not supported', HttpStatus.BAD_REQUEST);
  }
}
