import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUserTable1617949249614 implements MigrationInterface {
  name = 'createUserTable1617949249614';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "name" character varying NOT NULL, "dateOfBirth" character varying NOT NULL, "token" character varying NOT NULL, "tokenExp" integer NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
