import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { UserEntity } from '../entity/user.entity';
import { IUserRepository } from '@user/domain/repository/user.repository.interface';
import { GetUsersResultVO } from '@user/domain/vo/result/get-users.vo';
import { GetUsersInputVO } from '@user/domain/vo/input/get-users.vo';
import { UserVO } from '@shared/vo/user.vo';
import { CreateUserResultVO } from '@user/domain/vo/result/create-user.vo';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    private datasource: DataSource,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async create(user: CreateUserResultVO): Promise<void> {
    await this.userRepository.save(plainToInstance(UserEntity, user));
  }
  async getUser(id: string): Promise<UserVO> {
    const user = await this.userRepository.findOne({ where: { id } });
    return plainToInstance(UserVO, user);
  }
  async getUsers(getUsersInputVO: GetUsersInputVO): Promise<GetUsersResultVO> {
    const [users, total] = await this.userRepository.findAndCount({
      skip: getUsersInputVO.skip,
      take: getUsersInputVO.getLimit,
    });
    return new GetUsersResultVO(
      users.map((user) => plainToInstance(UserVO, user)),
      total,
      getUsersInputVO.getPage,
      getUsersInputVO.getLimit,
    );
  }
}
