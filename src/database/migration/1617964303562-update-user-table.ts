import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateUserTable1617964303562 implements MigrationInterface {
  name = 'updateUserTable1617964303562';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "password" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
  }
}
