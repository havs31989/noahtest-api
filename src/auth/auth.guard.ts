import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../service/auth/auth.service';

@Injectable()
export class JWTGuard extends AuthGuard('jwt') implements CanActivate {
    constructor(private authService: AuthService) {
        super();
    }

    canActivate(context: ExecutionContext) {
        // Add your custom authentication logic here
        return super.canActivate(context);
    }

    handleRequest(err, user, info) {
        // You can throw an exception based on either "info" or "err" arguments
        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        return user;
    }
}
