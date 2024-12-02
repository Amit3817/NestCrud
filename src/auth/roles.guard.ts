// src/auth/guards/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
    if (!roles) {
      return true; // If no roles are required, allow access
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      return false; // If no user is in the request, deny access
    }
    console.log(user);
    const hasRole = roles.some((role) => user.role.includes(role));  // Error here if user.role is undefined or null
    if (!hasRole) {
      throw new ForbiddenException('You do not have the necessary permissions');
    }

    return true;

  }

}
