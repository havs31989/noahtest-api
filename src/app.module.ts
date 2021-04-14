import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controller/auth/auth.controller';
import { AuthService } from './service/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { Constants } from './common/constants';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
        }),
        TypeOrmModule.forRoot(),
        PassportModule,
        JwtModule.register({
            secret: Constants.jwtSecret,
            signOptions: { expiresIn: Constants.jwtTokenExpiredIn },
        }),
    ],
    controllers: [AppController, AuthController],
    providers: [JwtStrategy, AppService, AuthService],
    exports: [PassportModule, JwtModule],
})
export class AppModule { }
