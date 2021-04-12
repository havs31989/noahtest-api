import { ApiProperty } from '@nestjs/swagger';

export class UserProfileModel {
  @ApiProperty()
  email: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  dateOfBirth: string;
  @ApiProperty()
  token: string;
}
