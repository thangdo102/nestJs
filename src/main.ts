import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //xoá các phần tử đc gửi lên từ client ko đc xác định trong dto
      //(ví dụ dto có 2 trường là email vs password, mà người dùng cố tình gửi lên thêm id => tự động xoá id)
    }),
  );
  await app.listen(3333);
}
bootstrap();
