import { SecurityCodeVO, SmsAuthEventVO } from '@auth/domain/vo/auth.vo';

export interface IAuthService {
  generateSecurityCode(): SecurityCodeVO;
  saveSecurityCode(securityCodeVO: SecurityCodeVO): Promise<void>;
  emitSmsAuthEvent(smsAuthEventVO: SmsAuthEventVO): void;
  validateSecurityCode(securityCodeVO: SecurityCodeVO): Promise<boolean>;
}
