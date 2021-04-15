import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogModel {
  @ApiProperty({ type: String })
  title = '';
  @ApiProperty({ type: String })
  shortTitle = '';
  @ApiProperty({ type: String })
  thumbPicture = '';
  @ApiProperty({ type: String })
  text = '';
}
