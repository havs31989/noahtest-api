import { Column, Entity } from 'typeorm';
import { DataEntity } from '../data.entity';

@Entity()
export class User extends DataEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  dateOfBirth: string;

  constructor() {
    super();
    this.email = '';
    this.name = '';
    this.dateOfBirth = '';
  }
}
