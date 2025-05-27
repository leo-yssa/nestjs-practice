import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { USER_TYPE, UserType } from '@shared/type/user.type';

export function JwtAuth(...types: UserType[]) {
  return applyDecorators(
    UseGuards(AuthGuard('jwt')),
    // Add custom metadata for user types
    (target: any, key: string, descriptor: PropertyDescriptor) => {
      Reflect.defineMetadata('userTypes', types, descriptor.value);
      return descriptor;
    },
  );
}

export function AdminJwtAuth() {
  return JwtAuth(USER_TYPE.ADMIN);
}

export function UserJwtAuth() {
  return JwtAuth(USER_TYPE.USER);
}

export function PartnerJwtAuth() {
  return JwtAuth(USER_TYPE.PARTNER);
}

export function AdminOrPartnerJwtAuth() {
  return JwtAuth(USER_TYPE.ADMIN, USER_TYPE.PARTNER);
}
