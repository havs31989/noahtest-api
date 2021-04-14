import { ApiProperty } from '@nestjs/swagger';

export class VerifyTokenModel {
  @ApiProperty()
  email = '';
  @ApiProperty()
  clientIdToken = '';
}
