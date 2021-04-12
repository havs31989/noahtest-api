import { MigrationInterface, QueryRunner } from 'typeorm';

export class createInternalUser1617952665846 implements MigrationInterface {
  name = 'createInternalUser1617952665846';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "internal_user" ("id" SERIAL NOT NULL, "createdTime" TIMESTAMP NOT NULL, "createdBy" character varying NOT NULL, "lastUpdatedTime" TIMESTAMP NOT NULL, "lastUpdatedBy" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "roles" integer array NOT NULL, "token" character varying NOT NULL, "tokenExp" integer NOT NULL, CONSTRAINT "PK_6363e7e769284a0fe407d9a3109" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "internal_user"`);
  }
}
