import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateClientProjectTables1748251022929 implements MigrationInterface {
    name = 'CreateClientProjectTables1748251022929'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "projects" ("id" SERIAL NOT NULL, "projectName" character varying NOT NULL, "projectDescripton" character varying NOT NULL, "address" character varying NOT NULL, "contactNo" character varying NOT NULL, "phone" character varying NOT NULL, "emailAddress" character varying NOT NULL, "org_id" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "active_status" integer NOT NULL DEFAULT '1', "clientId" integer, CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "client" ("id" SERIAL NOT NULL, "clientName" character varying NOT NULL, "clientDescripton" character varying NOT NULL, "address" character varying NOT NULL, "contactNo" character varying NOT NULL, "phone" character varying NOT NULL, "emailAddress" character varying NOT NULL, "org_id" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "active_status" integer NOT NULL DEFAULT '1', CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_091f9433895a53408cb8ae3864f" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_091f9433895a53408cb8ae3864f"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP TABLE "projects"`);
    }

}
