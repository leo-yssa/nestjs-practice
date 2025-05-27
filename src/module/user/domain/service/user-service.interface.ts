import { CreateUserInputVO, UserPhoneNumberVO, UserVO } from '@shared/vo/user.vo';

export interface IUserService {
  getUserByPhoneNumber(vo: UserPhoneNumberVO): Promise<UserVO>;
  createUser(vo: CreateUserInputVO): Promise<UserVO>;
}
