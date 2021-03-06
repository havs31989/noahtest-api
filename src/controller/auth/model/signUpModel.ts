import { ApiProperty } from '@nestjs/swagger';

export class SignUpModel {
  @ApiProperty({ type: String })
  email = '';
  @ApiProperty({ type: String })
  password = '';
  @ApiProperty({ type: String })
  name = '';
  @ApiProperty({ type: String })
  dateOfBirth = '';
}
