import { Column, PrimaryGeneratedColumn } from "typeorm";
import { EntityId } from "typeorm/repository/EntityId";

export abstract class DataEntity {
    @PrimaryGeneratedColumn()
    id: EntityId;

    @Column()
    createdTime: Date;

    @Column()
    createdBy: string;

    @Column()
    lastUpdatedTime: Date;

    @Column()
    lastUpdatedBy: string;
}