import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Configuración CORS
  app.enableCors({
    origin: 'http://localhost:3000', // Asegúrate que coincide con tu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Límites de tamaño para requests
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // Archivos estáticos
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads',
  });

  // Configuración única y completa del ValidationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,            // Elimina propiedades no decoradas en los DTOs
      forbidNonWhitelisted: true, // Lanza error si hay propiedades no permitidas
      transform: true,            // Convierte tipos automáticamente
      transformOptions: {
        enableImplicitConversion: true, // Convierte strings a números/booleanos
      },
    })
  );

  await app.listen(4000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();