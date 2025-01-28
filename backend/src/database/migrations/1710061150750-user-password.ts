import { MigrationInterface, QueryRunner } from "typeorm";

export class UserPassword1710061150750 implements MigrationInterface {
    name = 'UserPassword1710061150750'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
    }

}
