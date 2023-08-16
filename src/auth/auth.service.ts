import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async signup(dto: AuthDto) {
    //generate the password hash
    const hash = await argon.hash(dto.password);
    try {
      //save the new user in the db
      const user = await this.prismaService.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });

      delete user.hash; //Không trả về cho user mã hash mật khẩu

      //return the saved user
      return user;
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

    //send back user
    delete user.hash;
    return user;
  }
}
