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
import { BlogController } from './controller/blog/blog.controller';
import { BlogService } from './service/blog/blog.service';

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
  controllers: [AppController, AuthController, BlogController],
  providers: [JwtStrategy, AppService, AuthService, BlogService],
  exports: [PassportModule, JwtModule],
})
export class AppModule {}
