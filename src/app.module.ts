import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { SwaggerProvider } from '@shared/swagger/swagger.provider';
import { AuthModule } from '@shared/auth/auth.module';
import { RedisModule } from '@shared/redis/redis.module';
import { DatabaseModule } from '@shared/database/database.module';
import { HealthCheckController } from '@shared/health-check/health-check.controller';
import { WinstonModule } from '@shared/winston/winston.module';
import { LoggingModule } from '@shared/interceptor/logging/logging.module';
import { ExceptionModule } from '@shared/exception/exception.module';
import { TokenModule } from './token/token.module';
import { UserModule } from './user/user.module';
import { CollectionModule } from './collection/collection.module';

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
    UserModule,
    TokenModule,
    CollectionModule,
  ],
  controllers: [HealthCheckController],
  providers: [SwaggerProvider],
})
export class AppModule {}
