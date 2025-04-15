import { Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/users/domain/repository/user.repository.interface';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserVO } from 'src/users/domain/vo/user.vo';
import { plainToInstance } from 'class-transformer';
import { GetUsersResultVO } from 'src/users/domain/vo/result/get-users.vo';
import { GetUsersInputVO } from 'src/users/domain/vo/input/get-users.vo';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    private datasource: DataSource,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async create(user: UserVO): Promise<void> {
    await this.userRepository.save(plainToInstance(UserEntity, user));
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
