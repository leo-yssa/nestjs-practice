import { GetUsersInputVO } from '../vo/input/get-users.vo';
import { UserVO } from '@shared/vo/user.vo';
import { GetUsersResultVO } from '../vo/result/get-users.vo';
import { CreateUserInputVO } from '@shared/vo/user.vo';

export interface IUserRepository {
  createUser(createUserInputVo: CreateUserInputVO): Promise<UserVO>;
  getUser(id: string): Promise<UserVO>;
  getUsers(getUsersInputVO: GetUsersInputVO): Promise<GetUsersResultVO>;
  getUserByPhoneNumber(phoneNumber: string): Promise<UserVO>;
}
