import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ 
    transform: true,  // Enable transformation of plain objects to DTO instances
    whitelist: true,  // Strip properties that don't have decorators
    forbidNonWhitelisted: true,  // Throw an error if extra properties are present
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
