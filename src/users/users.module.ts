import { Logger, Module } from '@nestjs/common';
import { UserController } from './interface/user.controller';
import { UserRepository } from './infrastructure/database/repository/user.repository';
import { UserCache } from './infrastructure/cache/user.cache';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmsAuthCommandHandler } from './application/command/sms-auth.handler';
import { UserEntity } from './infrastructure/database/entity/user.entity';
import { UserDeviceEntity } from './infrastructure/database/entity/user-device.entity';
import { UserEventsHandler } from './application/event/user-events.handler';
import { CreateUserCommandHandler } from './application/command/create-user.handler';
import { UserFactory } from './domain/user.factory';
import { CreateTokenEventHandler } from './application/event/create-token-event.handler';
import { GetUsersHandler } from './application/query/get-users.handler';

const commandHandlers = [SmsAuthCommandHandler, CreateUserCommandHandler];
const queryHandlers = [GetUsersHandler];
const eventHandlers = [UserEventsHandler, CreateTokenEventHandler];
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserDeviceEntity]),
    CqrsModule,
  ],
  controllers: [UserController],
  providers: [
    ...commandHandlers,
    ...queryHandlers,
    ...eventHandlers,
    {
      provide: 'UserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'UserCache',
      useClass: UserCache,
    },
    UserFactory,
    Logger,
  ],
})
export class UsersModule {}
