import { ApiProperty } from '@nestjs/swagger';

export class UserProfileModel {
  @ApiProperty()
  email = '';
  @ApiProperty()
  name = '';
  @ApiProperty()
  dateOfBirth = '';
  @ApiProperty()
  token = '';
  @ApiProperty()
  refreshToken = '';
  @ApiProperty()
  tokenExp = 0;
}
