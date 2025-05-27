import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserInputVO, UpdateUserDeviceInputVO, UserPhoneNumberVO, UserVO } from '@shared/vo/user.vo';
import { UserPort } from '@auth/domain/port/user.port';
import { CreateUserCommand } from '@user/application/command/create-user.command';
import { UpdateUserDeviceCommand } from '@user/application/command/update-user-device.command';
import { GetUserByPhoneNumberQuery } from '@user/application/query/get-user-by-phone-number.query';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserAdapter implements UserPort {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  async getUserByPhoneNumber(userPhoneNumberVo: UserPhoneNumberVO): Promise<UserVO> {
    const user = await this.queryBus.execute(
      plainToInstance(GetUserByPhoneNumberQuery, {
        userPhoneNumberVo,
      }),
    );
    return user;
  }
  async createUser(createUserInputVo: CreateUserInputVO): Promise<UserVO> {
    const user = await this.commandBus.execute(
      plainToInstance(CreateUserCommand, {
        createUserInputVo,
      }),
    );
    return user;
  }
  async updateUserDevicePublicKey(updateUserDeviceInputVo: UpdateUserDeviceInputVO): Promise<void> {
    await this.commandBus.execute(plainToInstance(UpdateUserDeviceCommand, { updateUserDeviceInputVo }));
  }
  async getUserDevicePublicKey(userId: string): Promise<string> {
    const user = await this.queryBus.execute(
      plainToInstance(GetUserByPhoneNumberQuery, {
        userId,
      }),
    );
    return user.devicePublicKey;
  }
}
