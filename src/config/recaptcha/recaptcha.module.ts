import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { RecaptchaService } from './recaptcha.service';
import { RecaptchaOptions } from './recaptcha.options';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [RecaptchaService, RecaptchaOptions],
  exports: [RecaptchaService],
})
export class RecaptchaModule {}
