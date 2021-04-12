import { Column, Entity } from 'typeorm';
import { DataEntity } from '../data.entity';

@Entity()
export class User extends DataEntity {
  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  dateOfBirth: string;
}
