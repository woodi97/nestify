import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // if non-meaning parameters reaches, just ignore it
      whitelist: true,
      // if non-meaning parameters reaches, raising error
      forbidNonWhitelisted: true,
      // automatically transform to actual type(Ex: string -> number)
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
