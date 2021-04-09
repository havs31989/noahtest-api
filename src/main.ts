import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from '../config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = configuration().port;
  console.log('server listen at ' + port);
  await app.listen(configuration().port);
}
bootstrap();
