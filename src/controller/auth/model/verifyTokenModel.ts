import { ApiProperty } from '@nestjs/swagger';

export class VerifyTokenModel {
  @ApiProperty({ type: String })
  email = '';
  @ApiProperty({ type: String })
  clientIdToken = '';
}
