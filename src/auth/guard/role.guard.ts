import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';

import { ROLES_KEY } from '../decorator/roles.decorator';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  private logger = new Logger(RolesGuard.name);
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      //return true nghĩa là role nào cũng có thể truy cập vào controller đó
      return true;
    }

    // const {user} = context.switchToHttp().getRequest();

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    const payload: any = this.jwtService.decode(token);

    return requiredRoles.some((role) => payload.role === role);
  }

  private extractTokenFromHeader(request: Request | any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
