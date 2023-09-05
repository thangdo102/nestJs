import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator/get-user.decorator';
// import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('users')
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //UseGuards : sẽ tự động kiểm tra xem token có trong request header hay không,
  //và check xem token này có thông tin gì.
  //cách hoạt động:
  //1. khi sử sụng useGuards anotation, sẽ chạy vào hàm validate trong file jwt.strategy.ts
  //2. hàm validate sẽ do mình tự viết logic bên trong, sau khi check xong sẽ gắn dữ liệu trả về vào request
  //3. và ở đây chúng ta sẽ nhận đc dữ liệu đó thông qua request
  // AuthGuard là một NestJS Guard được viết sẵn bởi thư viện @nestjs/passport
  // cho phép tích hợp passport strategy vào bên trong API.
  // Mặc định AuthGuard sẽ gọi tới JWTStrategy mà chúng ta định nghĩa và đã thêm vào bên trong AuthModule trước đó.
  // @UseGuards(AuthGuard('jwt'))  //cách 1, dùng AuthGuard mặc định của passport
  // @Get('me')
  // getMe(@Req() req: any) {
  //   return req.user;
  // }

  //Cách 2, sử dụng custome AuthGuard vì req sẽ có lỗi
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Get('allUser')
  getAllUser() {
    return this.userService.getAllUser();
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
