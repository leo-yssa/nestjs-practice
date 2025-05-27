import { CreateUserInputVO, UserPhoneNumberVO, UpdateUserDeviceInputVO, UserVO } from '@shared/vo/user.vo';

export interface UserPort {
  getUserByPhoneNumber(userPhoneNumberVo: UserPhoneNumberVO): Promise<UserVO>;
  createUser(createUserInputVo: CreateUserInputVO): Promise<UserVO>;
  updateUserDevicePublicKey(updateUserDeviceInputVo: UpdateUserDeviceInputVO): Promise<void>;
  getUserDevicePublicKey(userId: string): Promise<string>;
}
