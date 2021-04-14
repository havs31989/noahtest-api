﻿import { ApiProperty } from '@nestjs/swagger';

export class SignUpModel {
  @ApiProperty()
  email = '';
  @ApiProperty()
  password = '';
  @ApiProperty()
  name = '';
  @ApiProperty()
  dateOfBirth = '';
}
