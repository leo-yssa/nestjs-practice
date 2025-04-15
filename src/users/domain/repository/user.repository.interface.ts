import { GetUsersInputVO } from '../vo/input/get-users.vo';
import { GetUsersResultVO } from '../vo/result/get-users.vo';
import { UserVO } from '../vo/user.vo';

export interface IUserRepository {
  create(user: UserVO): Promise<void>;
  getUsers(getUsersInputVO: GetUsersInputVO): Promise<GetUsersResultVO>;
}
