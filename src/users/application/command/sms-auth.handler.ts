import { ulid } from 'ulid';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IUserRepository } from 'src/users/domain/repository/user.repository.interface';
import { SmsAuthCommand } from './sms-auth.command';
import { IUserCache } from 'src/users/domain/cache/user.cache.interface';
import { UserFactory } from 'src/users/domain/user.factory';

@Injectable()
@CommandHandler(SmsAuthCommand)
export class SmsAuthCommandHandler implements ICommandHandler<SmsAuthCommand> {
  constructor(
    private logger: Logger,
    private userFactory: UserFactory,
    @Inject('UserRepository') private userRepository: IUserRepository,
    @Inject('UserCache') private userCache: IUserCache,
  ) {}

  async execute(command: SmsAuthCommand): Promise<string> {
    const { countryCode, phoneNumber } = command;
    const id = ulid();
    const securityCode = this.generateSecurityCode();
    await this.userCache.create(id, securityCode, 1);
    this.userFactory.create(id, securityCode, countryCode, phoneNumber);
    return id;
  }

  generateSecurityCode(): string {
    return Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join(
      '',
    );
  }
}
