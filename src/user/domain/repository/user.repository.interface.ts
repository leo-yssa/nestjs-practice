import { GetUsersInputVO } from '../vo/input/get-users.vo';
import { GetUserResultVO } from '../vo/result/get-user.vo';
import { GetUsersResultVO } from '../vo/result/get-users.vo';
import { CreateUserResultVO } from '../vo/result/create-user.vo';

export interface IUserRepository {
  create(user: CreateUserResultVO): Promise<void>;
  getUser(id: string): Promise<GetUserResultVO>;
  getUsers(getUsersInputVO: GetUsersInputVO): Promise<GetUsersResultVO>;
}
