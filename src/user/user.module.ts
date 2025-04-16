import { Logger, Module } from '@nestjs/common';
import { UserController } from './interface/user.controller';
import { UserRepository } from './infrastructure/database/repository/user.repository';
import { UserCache } from './infrastructure/cache/user.cache';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infrastructure/database/entity/user.entity';
import { UserDeviceEntity } from './infrastructure/database/entity/user-device.entity';
import { CreateTokenEventHandler } from './application/event/create-token-event.handler';
import { GetUsersHandler } from './application/query/get-users.handler';
import { GetUserHandler } from './application/query/get-user.handler';

const commandHandlers = [];
const queryHandlers = [GetUsersHandler, GetUserHandler];
const eventHandlers = [CreateTokenEventHandler];
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
    Logger,
  ],
})
export class UserModule {}
