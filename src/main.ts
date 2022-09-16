import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const swagerConfig = new DocumentBuilder()
    .setTitle('Financial report app')
    .setVersion('1.0')
    .build();

  SwaggerModule.setup(
    'api',
    app,
    SwaggerModule.createDocument(app, swagerConfig),
  );

  await app.listen(3000);
}
bootstrap();
