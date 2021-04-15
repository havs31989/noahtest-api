import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from '../config/configuration';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as admin from 'firebase-admin';
import { HttpExceptionFilter } from './http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());
  if (process.env.ENV == 'DEV') {
    const config = new DocumentBuilder()
      .setTitle('NoahTest API')
      .setDescription('NoahTest API description')
      .setVersion('1.0')
      .addBearerAuth({ in: 'header', type: 'http' })
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }
  admin.initializeApp({
    credential: admin.credential.cert(
      'config/noahtest-api-firebase-adminsdk-6sbab-e2a0bebcc7.json',
    ),
  });
  const appReadyInterval = setInterval(async () => {
    console.log(admin.apps);
    if (admin.apps) {
      const port = configuration().port;
      console.log('server listen at ' + port);
      await app.listen(configuration().port);
      clearInterval(appReadyInterval);
      console.log('server ready');
    }
  }, 1000);
}
bootstrap();
