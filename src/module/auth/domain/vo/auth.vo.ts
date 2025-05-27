export class AuthVO {
  constructor(
    public readonly id: string,
    public readonly securityCode: string,
    public readonly callingCode: string,
    public readonly phoneNumber: string,
    public readonly accessToken: string,
    public readonly refreshToken: string,
    public readonly publicKey: string,
    public readonly signature: string,
    public readonly message: string,
  ) {}
}

export type SmsAuthVO = Pick<AuthVO, 'callingCode' | 'phoneNumber'>;
export type LoginWithSmsVO = Pick<AuthVO, 'id' | 'securityCode' | 'callingCode' | 'phoneNumber'>;
export type TokenPairVO = Pick<AuthVO, 'accessToken' | 'refreshToken'>;
export type SecurityCodeVO = Pick<AuthVO, 'id' | 'securityCode'>;
export type SmsAuthEventVO = Pick<AuthVO, 'id' | 'securityCode' | 'callingCode' | 'phoneNumber'>;
export type BioRegisterVO = Pick<AuthVO, 'id' | 'publicKey'>;
export type BioAuthVO = Pick<AuthVO, 'id' | 'signature' | 'message'>;
