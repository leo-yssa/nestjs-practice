import { Module } from '@nestjs/common';
import { MulterModule as NestMulterModule } from '@nestjs/platform-express';
import { MulterOptions } from './multer.options';

@Module({
  imports: [
    NestMulterModule.registerAsync({
      useClass: MulterOptions,
    }),
  ],
})
export class MulterModule {}
