import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signup(dto: AuthDto) {
    //generate the password hash
    const hash = await argon.hash(dto.password);
    try {
      //save the new user in the db
      const user = await this.prismaService.user.create({
        data: {
          email: dto.email,
          hash,
          role: 'USER',
        },
      });
      const token = await this.signToken(user.id, user.email, user.role);
      return {
        access_token: token,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
    }
  }

  async signin(dto: AuthDto) {
    //find the user by email
    //findFirst là sẽ trả về kết quả đầu tiên nếu bất kì trường truyền vào đúng
    //findUnique là sẽ so sánh trường là unique trong bảng, ví dụ như id, email
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    //if user does not exist throw exception
    if (!user) throw new ForbiddenException('Cridentials incorrect!');

    //compare password
    const pwMatches = await argon.verify(user.hash, dto.password);
    //if password incorrect throw exception
    if (!pwMatches) throw new ForbiddenException('Cridentials incorrect!');

    const token = await this.signToken(user.id, user.email, user.role);

    //send back user
    return { access_token: token, account: { ...dto, role: user.role } };
  }

  async signToken(userId: number, email: string, role: Role): Promise<string> {
    const payload = {
      sub: userId,
      email,
      role: role,
    };

    const secret = this.configService.get('JWT_SECRET');

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '24h',
      secret: secret,
    });

    return token;
  }
}
