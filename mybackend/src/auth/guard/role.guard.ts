import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enum/Role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.get<Role>('role', context.getHandler());

    if (!requiredRole) {
      // No role specified, allow access
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.role || user.role.role !== requiredRole) {
      // User doesn't have the required role, deny access
      throw new ForbiddenException('Anda tidak mempunyai hak akses');
    }

    // User has the required role, allow access
    return true;
  }
}
