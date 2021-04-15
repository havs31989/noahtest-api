import { ApiProperty } from '@nestjs/swagger';

export class SignInModel {
  @ApiProperty({ type: String })
  email = '';
  @ApiProperty({ type: String })
  password = '';
}
