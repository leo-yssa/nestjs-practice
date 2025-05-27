export class UserVO {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly callingCode: string,
    public readonly phoneNumber: string,
    public readonly devicePublicKey: string,
    public readonly status: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}

export type UserPhoneNumberVO = Pick<UserVO, 'phoneNumber'>;
export type CreateUserInputVO = Pick<UserVO, 'callingCode' | 'phoneNumber' | 'status'>;
export type UpdateUserDeviceInputVO = Pick<UserVO, 'id' | 'devicePublicKey'>;
