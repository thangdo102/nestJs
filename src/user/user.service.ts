import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getAllUser() {
    return await this.prismaService.user.findMany({});
  }

  async delete(id: number) {
    return await this.prismaService.user.delete({
      where: {
        id: id,
      },
    });
  }
}
