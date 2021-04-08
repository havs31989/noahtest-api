import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { EntityId } from "typeorm/repository/EntityId";

@Entity()
export class User extends BaseEntity  {
    @PrimaryGeneratedColumn()
    id: EntityId;

    @Column()
    email: string;

    @Column()
    name: string;

    @Column()
    dateOfBirth: string;
}