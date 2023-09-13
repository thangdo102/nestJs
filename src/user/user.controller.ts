import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { Role, User } from '@prisma/client';
import { GetUser } from '../common/decorator/get-user.decorator';
// import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from '../common/guard/jwt.guard';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { Roles } from 'src/common/decorator/roles.decorator';

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

  @Roles(Role.ADMIN)
  @Get('allUser')
  getAllUser() {
    return this.userService.getAllUser();
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  delete(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.userService.delete(id);
  }
}
