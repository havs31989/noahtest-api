import { ApiProperty } from '@nestjs/swagger';
import { EntityId } from 'typeorm/repository/EntityId';

export class UpdateBlogModel {
  @ApiProperty()
  id: EntityId;
  @ApiProperty({ type: String })
  title = '';
  @ApiProperty({ type: String })
  shortTitle = '';
  @ApiProperty({ type: String })
  thumbPicture = '';
  @ApiProperty({ type: String })
  text = '';
}
