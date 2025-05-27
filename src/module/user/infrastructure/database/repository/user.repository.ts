import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { UserEntity } from '../entity/user.entity';
import { IUserRepository } from '@user/domain/repository/user-repository.interface';
import { GetUsersResultVO } from '@user/domain/vo/result/get-users.vo';
import { GetUsersInputVO } from '@user/domain/vo/input/get-users.vo';
import { UserVO } from '@shared/vo/user.vo';
import { CreateUserInputVO } from '@shared/vo/user.vo';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    private datasource: DataSource,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async createUser(createUserInputVo: CreateUserInputVO): Promise<UserVO> {
    const userEntity = await this.userRepository.save(plainToInstance(UserEntity, createUserInputVo));
    return plainToInstance(UserVO, userEntity);
  }
  async getUser(id: string): Promise<UserVO> {
    const user = await this.userRepository.findOne({ where: { id } });
    return plainToInstance(UserVO, user);
  }
  async getUserByPhoneNumber(phoneNumber: string): Promise<UserVO> {
    const user = await this.userRepository.findOne({
      where: { phoneNumber },
    });
    return plainToInstance(UserVO, user);
  }
  async getUsers(getUsersInputVO: GetUsersInputVO): Promise<GetUsersResultVO> {
    const [users, total] = await this.userRepository.findAndCount({
      skip: getUsersInputVO.skip,
      take: getUsersInputVO.limit,
    });
    return new GetUsersResultVO(
      users.map((user) => plainToInstance(UserVO, user)),
      total,
      getUsersInputVO.page,
      getUsersInputVO.limit,
    );
  }
}
