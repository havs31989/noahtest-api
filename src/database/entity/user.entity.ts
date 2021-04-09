import { BaseEntity, Column, Entity } from 'typeorm';
import { EntityId } from 'typeorm/repository/EntityId';
import { DataEntity } from '../data.entity';

@Entity()
export class User extends DataEntity {
    @Column()
    email: string;

    @Column()
    name: string;

    @Column()
    dateOfBirth: string;

    @Column()
    token: string;

    @Column()
    tokenExp: number;
}
