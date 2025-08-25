import { MigrationInterface, QueryRunner } from "typeorm";

export class AddForeignColumnTables1748343748822 implements MigrationInterface {
    name = 'AddForeignColumnTables1748343748822'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tiAttachments" DROP CONSTRAINT "FK_5874c04fbe8c000f4b58dcbd70b"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_0e6a1a1684181a7fcad8f01a7f2"`);
        await queryRunner.query(`ALTER TABLE "generateTicket" DROP CONSTRAINT "FK_89745bdf3e0a98e9c97e2ee75a7"`);
        await queryRunner.query(`ALTER TABLE "generateTicket" DROP CONSTRAINT "FK_94b0ab2eea70b1842b94ecca9a9"`);
        await queryRunner.query(`ALTER TABLE "generateTicket" DROP CONSTRAINT "FK_269b56d87c5b16fb6503445bf39"`);
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_091f9433895a53408cb8ae3864f"`);
        await queryRunner.query(`ALTER TABLE "tiAttachments" RENAME COLUMN "generateTicketId" TO "ticketId"`);
        await queryRunner.query(`ALTER TABLE "projects" RENAME COLUMN "clientId" TO "client_id"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "generateTicketId"`);
        await queryRunner.query(`ALTER TABLE "generateTicket" DROP COLUMN "clientId"`);
        await queryRunner.query(`ALTER TABLE "generateTicket" DROP COLUMN "projectId"`);
        await queryRunner.query(`ALTER TABLE "generateTicket" DROP COLUMN "clientsId"`);
        await queryRunner.query(`ALTER TABLE "generateTicket" ADD "project_id" integer`);
        await queryRunner.query(`ALTER TABLE "generateTicket" ADD "client_id" integer`);
        await queryRunner.query(`ALTER TABLE "generateTicket" ADD "employeeId" integer`);
        await queryRunner.query(`ALTER TABLE "tiAttachments" ADD CONSTRAINT "FK_d8f30cd8018fe7f89590e3bfd6f" FOREIGN KEY ("ticketId") REFERENCES "generateTicket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "generateTicket" ADD CONSTRAINT "FK_456404ea62f8a8150e9af4aae07" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "generateTicket" ADD CONSTRAINT "FK_0a21c56b3c7e6d101a987a674eb" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "generateTicket" ADD CONSTRAINT "FK_5fbd927f929fea69521117792fe" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_ca29f959102228649e714827478" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_ca29f959102228649e714827478"`);
        await queryRunner.query(`ALTER TABLE "generateTicket" DROP CONSTRAINT "FK_5fbd927f929fea69521117792fe"`);
        await queryRunner.query(`ALTER TABLE "generateTicket" DROP CONSTRAINT "FK_0a21c56b3c7e6d101a987a674eb"`);
        await queryRunner.query(`ALTER TABLE "generateTicket" DROP CONSTRAINT "FK_456404ea62f8a8150e9af4aae07"`);
        await queryRunner.query(`ALTER TABLE "tiAttachments" DROP CONSTRAINT "FK_d8f30cd8018fe7f89590e3bfd6f"`);
        await queryRunner.query(`ALTER TABLE "generateTicket" DROP COLUMN "employeeId"`);
        await queryRunner.query(`ALTER TABLE "generateTicket" DROP COLUMN "client_id"`);
        await queryRunner.query(`ALTER TABLE "generateTicket" DROP COLUMN "project_id"`);
        await queryRunner.query(`ALTER TABLE "generateTicket" ADD "clientsId" integer`);
        await queryRunner.query(`ALTER TABLE "generateTicket" ADD "projectId" integer`);
        await queryRunner.query(`ALTER TABLE "generateTicket" ADD "clientId" integer`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "generateTicketId" integer`);
        await queryRunner.query(`ALTER TABLE "projects" RENAME COLUMN "client_id" TO "clientId"`);
        await queryRunner.query(`ALTER TABLE "tiAttachments" RENAME COLUMN "ticketId" TO "generateTicketId"`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_091f9433895a53408cb8ae3864f" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "generateTicket" ADD CONSTRAINT "FK_269b56d87c5b16fb6503445bf39" FOREIGN KEY ("clientsId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "generateTicket" ADD CONSTRAINT "FK_94b0ab2eea70b1842b94ecca9a9" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "generateTicket" ADD CONSTRAINT "FK_89745bdf3e0a98e9c97e2ee75a7" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_0e6a1a1684181a7fcad8f01a7f2" FOREIGN KEY ("generateTicketId") REFERENCES "generateTicket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tiAttachments" ADD CONSTRAINT "FK_5874c04fbe8c000f4b58dcbd70b" FOREIGN KEY ("generateTicketId") REFERENCES "generateTicket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
