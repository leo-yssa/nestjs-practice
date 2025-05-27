import { InvalidSecurityCodeException } from '@auth/domain/exception/invalid-security-code.exception';
import { SecurityCodeStorageFailedException } from '@auth/domain/exception/security-code-storage-failed.exception';
import { UserNotFoundException } from '@auth/domain/exception/user-not-found.exception';
import { SmsAuthEventFailedException } from '@auth/domain/exception/sms-auth-event-failed.exception';
import { TokenGenerateFailedException } from '@auth/domain/exception/token-generate-failed.exceptioon';
import { InvalidTokenTypeException } from '@auth/domain/exception/invalid-token-type.exception';
export class AuthExceptionFactory {
  static createInvalidSecurityCodeException(): InvalidSecurityCodeException {
    return new InvalidSecurityCodeException();
  }
  static createUserNotFoundException(): UserNotFoundException {
    return new UserNotFoundException();
  }
  static createSecurityCodeStorageFailedException(): SecurityCodeStorageFailedException {
    return new SecurityCodeStorageFailedException();
  }
  static createSmsAuthEventFailedException(): SmsAuthEventFailedException {
    return new SmsAuthEventFailedException();
  }
  static createTokenGenerationFailedException(): TokenGenerateFailedException {
    return new TokenGenerateFailedException();
  }
  static createInvalidTokenTypeException(): InvalidTokenTypeException {
    return new InvalidTokenTypeException();
  }
}
