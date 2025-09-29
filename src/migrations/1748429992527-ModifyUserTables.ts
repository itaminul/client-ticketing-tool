import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyUserTables1748429992527 implements MigrationInterface {
    name = 'ModifyUserTables1748429992527'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "usergrp_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "userlevel_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "roll_id" SET DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "userRoleName" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "userRoleName" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "roll_id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "userlevel_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "usergrp_id" SET NOT NULL`);
    }

}
