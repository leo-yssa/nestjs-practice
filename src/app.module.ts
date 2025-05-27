import { AwsModule } from '@config/aws/aws.module';
import { DatabaseModule } from '@config/database/database.module';
import { LoggerModule } from '@config/logger/logger.module';
import { MailerModule } from '@config/mailer/mailer.module';
import { MetricModule } from '@config/metric/metric.module';
import { RedisModule } from '@config/redis/redis.module';
import { SwaggerService } from '@config/swagger/swagger.service';
import { HealthCheckController } from '@health-check/health-check.controller';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MulterModule } from '@nestjs/platform-express';
import { TerminusModule } from '@nestjs/terminus';
import { ProductModule } from '@product/product.module';
import { ExceptionModule } from '@shared/exception/exception.module';
import { UserModule } from '@user/user.module';
import { AuthModule } from '@auth/auth.module';
import { CommonModule } from '@common/common.module';
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
    LoggerModule,
    ExceptionModule,
    AwsModule,
    MailerModule,
    MulterModule,
    MetricModule,
    UserModule,
    CommonModule,
    ProductModule,
  ],
  controllers: [HealthCheckController],
  providers: [SwaggerService],
})
export class AppModule {}
