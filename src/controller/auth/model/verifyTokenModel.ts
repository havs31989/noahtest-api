import { ApiProperty } from '@nestjs/swagger';

export class VerifyTokenModel {
  @ApiProperty()
  email: string;
  @ApiProperty()
  clientIdToken: string;
}
