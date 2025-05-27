import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserType } from '@shared/type/user.type';

@Injectable()
export class UserTypeGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredTypes = this.reflector.get<UserType[]>('userTypes', context.getHandler());
    if (!requiredTypes) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.type) {
      throw new UnauthorizedException('User not authenticated');
    }

    const hasRequiredType = requiredTypes.includes(user.type as UserType);
    if (!hasRequiredType) {
      throw new UnauthorizedException('User type not authorized');
    }

    return true;
  }
}
