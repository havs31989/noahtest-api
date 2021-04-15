import { Column, Entity } from 'typeorm';
import { DataEntity } from '../data.entity';

@Entity()
export class InternalUser extends DataEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column('int', { array: true })
  roles: number[];

  @Column({ nullable: true })
  refreshToken: string;

  @Column()
  token: string;

  @Column()
  tokenExp: number;

  constructor() {
    super();
    this.email = '';
    this.password = '';
    this.roles = [];
    this.refreshToken = null;
    this.token = '';
    this.tokenExp = 0;
  }
}
