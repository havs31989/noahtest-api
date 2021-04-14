import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Route } from '../../../config/route';
import { JWTInternalGuard } from '../../auth/auth.internal.guard';
import { AuthService } from '../../service/auth/auth.service';
import { InternalSignInModel } from './model/internalSignInModel';
import { SignInModel } from './model/signInModel';
import { SignUpModel } from './model/signUpModel';
import { UserProfileModel } from './model/userProfileModel';
import { VerifyTokenModel } from './model/verifyTokenModel';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post(Route.authSignIn)
    public async signIn(@Body() model: SignInModel): Promise<UserProfileModel> {
        return await this.authService.signIn(model);
    }

    @Post(Route.authSignUp)
    public async signUp(@Body() model: SignUpModel): Promise<UserProfileModel> {
        return await this.authService.signUp(model);
    }

    @Post(Route.authInternalSignIn)
    public async internalSignIn(
        @Body() model: InternalSignInModel,
    ): Promise<UserProfileModel> {
        return await this.authService.internalSignIn(model);
    }

    @Post(Route.authVerifyToken)
    public async verifyToken(@Body() model: VerifyTokenModel): Promise<boolean> {
        return await this.authService.verfiyToken(model);
    }

    @UseGuards(JWTInternalGuard)
    @ApiBearerAuth()
    @Post(Route.authTest)
    public testAuth(): boolean {
        return true;
    }
}
