import { Column, Entity } from 'typeorm';
import { DataEntity } from '../data.entity';

@Entity()
export class Blog extends DataEntity {
  @Column()
  title: string;

  @Column()
  shortTitle: string;

  @Column()
  thumbPicture: string;

  @Column()
  text: string;

  constructor() {
    super();
    this.title = '';
    this.shortTitle = '';
    this.text = '';
  }
}
