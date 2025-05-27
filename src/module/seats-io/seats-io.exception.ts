import { HttpException, HttpStatus } from '@nestjs/common';

export class SeatsHoldFailedException extends HttpException {
  constructor() {
    super('Failed to hold seats', HttpStatus.BAD_REQUEST);
  }
}

export class SeatsConfirmFailedException extends HttpException {
  constructor() {
    super('Failed to confirm seats', HttpStatus.BAD_REQUEST);
  }
}

export class SeatsReleaseFailedException extends HttpException {
  constructor() {
    super('Failed to release seats', HttpStatus.BAD_REQUEST);
  }
}
