import { EntityId } from 'typeorm/repository/EntityId';

export class BlogModel {
  id: EntityId = '';
  title = '';
  shortTitle = '';
  thumbPicture = '';
  text = '';
  createdTime: Date = null;
  createdBy = '';
  lastUpdatedTime: Date = null;
  lastUpdatedBy = '';
}
