import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FirebaseService } from './firebase.service';
import { FirebaseOptions } from './firebase.options';

@Module({
  imports: [ConfigModule],
  providers: [FirebaseService, FirebaseOptions],
  exports: [FirebaseService],
})
export class FirebaseModule {}
