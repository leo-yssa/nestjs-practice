import { Inject, Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { CreateTokenEvent } from '@token/domain/create-token.event';
import { IUserRepository } from '@user/domain/repository/user.repository.interface';
import { CreateUserResultVO } from '@user/domain/vo/result/create-user.vo';

@EventsHandler(CreateTokenEvent)
export class CreateTokenEventHandler
  implements IEventHandler<CreateTokenEvent>
{
  private readonly logger = new Logger(CreateTokenEventHandler.name);
  constructor(
    @Inject('UserRepository') private userRepository: IUserRepository,
  ) {}
  async handle(event: CreateTokenEvent): Promise<void> {
    const { id, securityCode, countryCode, phoneNumber } = event;
    this.logger.log(
      `CreateTokenEvent received - id: ${id}, code: ${securityCode}, country: ${countryCode}, phone: ${phoneNumber}`,
    );
    this.userRepository.create(plainToInstance(CreateUserResultVO, event));
  }
}
