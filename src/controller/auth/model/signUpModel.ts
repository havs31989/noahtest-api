import { ApiProperty } from '@nestjs/swagger';

export class SignUpModel {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  dateOfBirth: string;
}
