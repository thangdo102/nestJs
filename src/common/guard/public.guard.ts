import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
import { Request } from 'express';
// import { UserKey } from '../enum/cache.key';
import { PrismaService } from 'src/prisma/prisma.service';
import { IS_PUBLIC_KEY } from '../decorator/public-guard.decorator';
import { UserKey } from '../enum/cache.key';
// import { UserKey } from '../enum/cache.key';

@Injectable()
export class PublicGuard implements CanActivate {
  private logger = new Logger(PublicGuard.name);
  constructor(
    private reflector: Reflector,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload: any = this.jwtService.decode(token);
      request['user'] = await this.handleUserInfo(payload.sub);
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private async getUserFromDb(id: string) {
    // TODO handle error
    return this.prismaService.user.findUnique({
      where: {
        id: +id,
      },
    });
  }

  private async handleUserInfo(userId: string) {
    let user = await this.cacheManager.get(UserKey(userId));

    if (!user) {
      user = await this.getUserFromDb(userId);
      const userDB = () => Promise.resolve(user);
      await this.cacheManager.wrap(UserKey(userId), () => userDB(), 10000);
    }

    return user;
  }
}
