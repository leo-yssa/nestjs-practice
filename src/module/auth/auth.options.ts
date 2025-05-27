import { Injectable } from '@nestjs/common';
import { type IAuthModuleOptions, type AuthOptionsFactory } from '@nestjs/passport';

@Injectable()
export class AuthOptions implements AuthOptionsFactory {
  createAuthOptions(): Promise<IAuthModuleOptions> | IAuthModuleOptions {
    return {
      defaultStrategy: 'jwt',
      session: true,
    };
  }
}
