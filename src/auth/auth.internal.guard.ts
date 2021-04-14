import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../service/auth/auth.service';

@Injectable()
export class JWTInternalGuard extends AuthGuard('jwt') implements CanActivate {
    constructor(private authService: AuthService) {
        super();
    }

    canActivate(context: ExecutionContext): boolean {
        let result = false;
        const request = context.switchToHttp().getRequest();
        const token = request.headers["authorization"].replace('Bearer ', '');
        result = this.authService.verifyInternalToken(token);
        return result;
    }
}
