import { UserVO } from '@shared/vo/user.vo';

export interface IUserPort {
  getUserById(id: string): Promise<UserVO>;
}
