import { UserVO } from '@shared/vo/user.vo';
import { EntityManager } from 'typeorm';
export interface UserPort {
  getUserById(id: string, manager?: EntityManager): Promise<UserVO>;
}
