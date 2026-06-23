import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { TrimPipe } from './common/pipes/trim.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
  });

  app.useGlobalPipes(new TrimPipe());

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  const config = new DocumentBuilder()
    .setTitle('Task Manager API')
    .setDescription('API para gestión de tareas')
    .setVersion('1.0')
    .setContact('Kelly Joy Hernández', '', 'kelly.joy.hernandez@gmail.com')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT || 3001);
  console.log(`🚀 API corriendo en: http://localhost:${process.env.PORT || 3001}`);
  console.log(`📚 Swagger: http://localhost:${process.env.PORT || 3001}/api/docs`);
}
bootstrap();