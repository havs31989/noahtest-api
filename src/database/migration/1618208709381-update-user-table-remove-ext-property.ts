import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateUserTableRemoveExtProperty1618208709381
  implements MigrationInterface {
  name = 'updateUserTableRemoveExtProperty1618208709381';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "token"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "tokenExp"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "password" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "tokenExp" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "token" character varying NOT NULL`,
    );
  }
}
