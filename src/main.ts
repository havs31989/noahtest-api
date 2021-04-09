import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from '../config/configuration';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    if (process.env.ENV == 'DEV') {
        const config = new DocumentBuilder()
            .setTitle('NoahTest API')
            .setDescription('NoahTest API description')
            .setVersion('1.0')
            .build();
        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('docs', app, document);
    }
    const port = configuration().port;
    console.log('server listen at ' + port);
    await app.listen(configuration().port);
}
bootstrap();
