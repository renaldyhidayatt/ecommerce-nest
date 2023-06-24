import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: false,
      validateCustomDecorators: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );


  const configSwagger = new DocumentBuilder()
    .setTitle('Ecommerce Documention')
    .setDescription('Dokumentasi untuk api ecommerce')
    .setVersion('1.1')
    .addBearerAuth()
    .build();

  const configCustomSwagger: SwaggerCustomOptions = {
    swaggerOptions: {
      docExpansion: 'none',
    },
  };

  const doc = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('doc', app, doc, configCustomSwagger);

  await app.listen(5000);
}
bootstrap();
