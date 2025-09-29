import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyUserCreateByColumnTables1748430262877 implements MigrationInterface {
    name = 'ModifyUserCreateByColumnTables1748430262877'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "createdby" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "createdby" SET NOT NULL`);
    }

}
