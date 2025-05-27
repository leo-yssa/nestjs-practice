import { Logger, Module } from '@nestjs/common';
import { UserController } from './interface/user.controller';
import { UserRepository } from './infrastructure/database/repository/user.repository';
import { UserCache } from './infrastructure/cache/user.cache';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infrastructure/database/entity/user.entity';
import { GetUsersQueryHandler } from './application/query/get-users.handler';
import { GetUserQueryHandler } from './application/query/get-user.handler';
import { UserService } from './application/service/user.service';
import { GetUserByPhoneNumberQueryHandler } from './application/handler/get-user-by-phone-number.handler';
import { CreateUserCommandHandler } from './application/handler/create-user.handler';

const commandHandlers = [CreateUserCommandHandler];
const queryHandlers = [GetUsersQueryHandler, GetUserQueryHandler, GetUserByPhoneNumberQueryHandler];
const eventHandlers = [];
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), CqrsModule],
  controllers: [UserController],
  providers: [
    ...commandHandlers,
    ...queryHandlers,
    ...eventHandlers,
    {
      provide: 'UserService',
      useClass: UserService,
    },
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
