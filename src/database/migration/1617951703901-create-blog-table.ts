import { MigrationInterface, QueryRunner } from 'typeorm';

export class createBlogTable1617951703901 implements MigrationInterface {
  name = 'createBlogTable1617951703901';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "blog" ("id" SERIAL NOT NULL, "createdTime" TIMESTAMP NOT NULL, "createdBy" character varying NOT NULL, "lastUpdatedTime" TIMESTAMP NOT NULL, "lastUpdatedBy" character varying NOT NULL, "title" character varying NOT NULL, "shortTitle" character varying NOT NULL, "thumbPicture" character varying NOT NULL, "text" character varying NOT NULL, CONSTRAINT "PK_85c6532ad065a448e9de7638571" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "createdTime" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "createdBy" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "lastUpdatedTime" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "lastUpdatedBy" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastUpdatedBy"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastUpdatedTime"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdBy"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdTime"`);
    await queryRunner.query(`DROP TABLE "blog"`);
  }
}
