import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
// import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const configService = app.get(ConfigService);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');

  // swagger
  if (configService.get<boolean>('ENABLE_SWAGGER')) {
    const swgConfig = new DocumentBuilder()
      .setTitle('nestJs')
      .setDescription('The nestJs API')
      .setVersion('1.0')
      .addBearerAuth()
      .addSecurityRequirements('bearer')
      .addServer('', 'dev')
      .addServer(configService.get<string>('BASE_URL') + ':' + port, 'local')
      .build();
    const document = SwaggerModule.createDocument(app, swgConfig);
    SwaggerModule.setup('/api', app, document);
  }
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //xoá các phần tử đc gửi lên từ client ko đc xác định trong dto
      //(ví dụ dto có 2 trường là email vs password, mà người dùng cố tình gửi lên thêm id => tự động xoá id)
    }),
  );
  await app.listen(port);
}
bootstrap();
