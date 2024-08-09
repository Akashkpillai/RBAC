import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLE_KEYS } from 'src/decorators/role.decorators';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private reflector:Reflector){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    const roles = this.reflector.get<string[]>(ROLE_KEYS, context.getHandler());
    const userRoles = request.user.role
    if(!roles.includes(userRoles)){
      throw new UnauthorizedException("Unauthorized data/sensitive data")
    }
    return true;
  }
}
