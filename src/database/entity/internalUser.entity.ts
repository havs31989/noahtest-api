import { Column, Entity } from 'typeorm';
import { DataEntity } from '../data.entity';

@Entity()
export class InternalUser extends DataEntity {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column('int', { array: true })
  roles: number[];

  @Column()
  token: string;

  @Column()
  tokenExp: number;
}
