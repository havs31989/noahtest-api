import { ApiProperty } from '@nestjs/swagger';

export class SignInModel {
  @ApiProperty()
  email = '';
  @ApiProperty()
  password = '';
}
