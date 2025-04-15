import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { UsersModule } from './users/users.module';
import { SwaggerProvider } from './swagger/swagger.provider';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './redis/redis.module';
import { DatabaseModule } from './database/database.module';
import { HealthCheckController } from './health-check/health-check.controller';
import { WinstonModule } from './winston/winston.module';
import { LoggingModule } from './interceptor/logging/logging.module';
import { ExceptionModule } from './exception/exception.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TokenModule } from './token/token.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`],
      isGlobal: true,
    }),
    EventEmitterModule.forRoot({
      wildcard: false,
      delimiter: '.',
      global: true,
    }),
    DatabaseModule,
    RedisModule,
    AuthModule,
    TerminusModule,
    WinstonModule,
    LoggingModule,
    ExceptionModule,
    UsersModule,
    TokenModule,
  ],
  controllers: [HealthCheckController],
  providers: [SwaggerProvider],
})
export class AppModule {}
