import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './database/entity/user';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: configuration().database.host,
            port: configuration().database.port,
            username: configuration().database.user,
            password: configuration().database.password,
            database: configuration().database.name,
            synchronize: false,
            logging: false,
            entities: [
                User
            ]
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
