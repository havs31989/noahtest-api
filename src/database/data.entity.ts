import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { EntityId } from 'typeorm/repository/EntityId';

export class DataEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: EntityId;

  @Column()
  createdTime: Date;

  @Column()
  createdBy: string;

  @Column({ nullable: true })
  lastUpdatedTime: Date;

  @Column({ nullable: true })
  lastUpdatedBy: string;

  constructor() {
    super();
    this.createdTime = new Date();
    this.createdBy = 'system';
  }
}
