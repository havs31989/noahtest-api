import { MigrationInterface, QueryRunner } from 'typeorm';

export class modifyBaseentityFields1618211365513 implements MigrationInterface {
  name = 'modifyBaseentityFields1618211365513';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "blog" ALTER COLUMN "lastUpdatedTime" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "blog" ALTER COLUMN "lastUpdatedBy" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "internal_user" ALTER COLUMN "lastUpdatedTime" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "internal_user" ALTER COLUMN "lastUpdatedBy" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "lastUpdatedTime" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "lastUpdatedBy" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "lastUpdatedBy" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "lastUpdatedTime" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "internal_user" ALTER COLUMN "lastUpdatedBy" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "internal_user" ALTER COLUMN "lastUpdatedTime" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "blog" ALTER COLUMN "lastUpdatedBy" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "blog" ALTER COLUMN "lastUpdatedTime" SET NOT NULL`,
    );
  }
}
