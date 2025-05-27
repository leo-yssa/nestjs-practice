export class SmsException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SmsException';
  }
}

export class SmsApiException extends SmsException {
  constructor(
    message: string,
    public readonly response?: any,
  ) {
    super(message);
    this.name = 'SmsApiException';
  }
}
