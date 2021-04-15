import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateUserEmailUnique1618470294997 implements MigrationInterface {
  name = 'updateUserEmailUnique1618470294997';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "internal_user" ADD CONSTRAINT "UQ_f218c2ea078a637699d4d492693" UNIQUE ("email")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`,
    );
    await queryRunner.query(
      `ALTER TABLE "internal_user" DROP CONSTRAINT "UQ_f218c2ea078a637699d4d492693"`,
    );
  }
}
