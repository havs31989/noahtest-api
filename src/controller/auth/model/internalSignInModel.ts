import { ApiProperty } from '@nestjs/swagger';

export class InternalSignInModel {
  @ApiProperty({ type: String })
  email = '';
  @ApiProperty({ type: String })
  password = '';
}
