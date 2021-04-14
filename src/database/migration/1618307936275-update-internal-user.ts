import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateInternalUser1618307936275 implements MigrationInterface {
  name = 'updateInternalUser1618307936275';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "internal_user" ADD "refreshToken" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "internal_user" DROP COLUMN "refreshToken"`,
    );
  }
}
