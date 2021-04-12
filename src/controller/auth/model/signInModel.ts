import { ApiProperty } from '@nestjs/swagger';

export class SignInModel {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
