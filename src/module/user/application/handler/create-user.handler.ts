import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserVO } from '@shared/vo/user.vo';
import { CreateUserCommand } from '../command/create-user.command';
import { IUserService } from '@user/domain/service/user-service.interface';
@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand> {
  constructor(@Inject('UserService') private userService: IUserService) {}

  async execute(command: CreateUserCommand): Promise<UserVO> {
    const { createUserInputVo } = command;

    return await this.userService.createUser(createUserInputVo);
  }
}
