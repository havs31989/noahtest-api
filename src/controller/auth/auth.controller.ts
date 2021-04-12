import { Body, Controller, Post } from '@nestjs/common';
import { Route } from '../../../config/route';
import { AuthService } from '../../service/auth/auth.service';
import { SignInModel } from './model/signInModel';
import { SignUpModel } from './model/signUpModel';
import { UserProfileModel } from './model/userProfileModel';
import { VerifyTokenModel } from './model/verifyTokenModel';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post(Route.authSignIn)
  public async signIn(@Body() model: SignInModel): Promise<UserProfileModel> {
    return await this.authService.signIn(model);
  }

  @Post(Route.authSignUp)
  public async signUp(@Body() model: SignUpModel): Promise<UserProfileModel> {
    return await this.authService.signUp(model);
  }

  @Post(Route.verifyToken)
  public async verifyToken(@Body() model: VerifyTokenModel): Promise<boolean> {
    return await this.authService.verfiyToken(model);
  }
}
