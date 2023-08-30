import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }

  cleanDb() {
    //transaction là để prisma sẽ thực hiện những thứ bên trong theo thứ tự cụ thể
    return this.$transaction([this.user.deleteMany()]);
  }
}
