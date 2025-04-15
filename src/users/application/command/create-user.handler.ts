import { Inject, Injectable, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IUserRepository } from 'src/users/domain/repository/user.repository.interface';
import { IUserCache } from 'src/users/domain/cache/user.cache.interface';
import { UserFactory } from 'src/users/domain/user.factory';
import { CreateUserCommand } from './create-user.command';

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand>
{
  constructor(
    private logger: Logger,
    private userFactory: UserFactory,
    @Inject('UserRepository') private userRepository: IUserRepository,
    @Inject('UserCache') private userCache: IUserCache,
  ) {}

  async execute(command: CreateUserCommand): Promise<string> {
    const { id, securityCode, countryCode, phoneNumber } = command;
    const _securityCode = await this.userCache.get(id);
    if (securityCode !== JSON.parse(_securityCode)) {
      throw Error('');
    }

    this.userFactory.create(id, securityCode, countryCode, phoneNumber);
    return id;
  }
}
