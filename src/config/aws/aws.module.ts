import { Global, Module } from '@nestjs/common';
import { AwsOptions } from './aws.options';
@Global()
@Module({
  providers: [AwsOptions],
  exports: [AwsOptions],
})
export class AwsModule {}
