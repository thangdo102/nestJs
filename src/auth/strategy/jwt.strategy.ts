import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

//Mỗi một phương thức xác thực sẽ đc gọi là 1 strategy
//có 2 phương thức phổ biến là passport_local và passport_jwt
//ở đây ta sẽ dùng passport_jwt

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    private prismaService: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  //hàm này sẽ nhận vào access_token và decode token đó
  // sau đó sẽ lấy payload của token đó làm đầu vào và kiểm tra bằng logic chúng ta tự viết
  // Sau khi có kết quả kiểm tra, thông tin được trả về trong phương thức validate sẽ được thêm vào thông tin
  // của request, từ đó ta có thể đọc được thông tin xác thưc của người dùng bằng cách gọi request.user,
  // việc này sẽ do passport-jwt tự động thực hiện.
  async validate(payload: { sub: number; email: string }) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: payload.sub,
      },
    });
    delete user.hash;
    return user;
  }
}
