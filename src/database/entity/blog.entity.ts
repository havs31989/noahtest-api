import { BaseEntity, Column, Entity } from 'typeorm';
import { EntityId } from 'typeorm/repository/EntityId';
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
}
