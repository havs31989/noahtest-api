import { ApiProperty } from '@nestjs/swagger';

export class InternalSignInModel {
  @ApiProperty()
  email = '';
  @ApiProperty()
  password = '';
}
