import { Inject, Injectable } from '@nestjs/common';
import { CreateUserInputVO, UserPhoneNumberVO, UserVO } from '@shared/vo/user.vo';
import { IUserRepository } from '@user/domain/repository/user-repository.interface';
import { IUserService } from '@user/domain/service/user-service.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(@Inject('UserRepository') private userRepository: IUserRepository) {}

  async getUserByPhoneNumber(userPhoneNumberVo: UserPhoneNumberVO): Promise<UserVO> {
    return await this.userRepository.getUserByPhoneNumber(userPhoneNumberVo.phoneNumber);
  }
  async createUser(createUserInputVo: CreateUserInputVO): Promise<UserVO> {
    return await this.userRepository.createUser(createUserInputVo);
  }
}
