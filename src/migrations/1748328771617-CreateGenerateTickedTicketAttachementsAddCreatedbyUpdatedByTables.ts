import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateGenerateTickedTicketAttachementsAddCreatedbyUpdatedByTables1748328771617
  implements MigrationInterface
{
  name =
    "CreateGenerateTickedTicketAttachementsAddCreatedbyUpdatedByTables1748328771617";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tiAttachments" ("id" SERIAL NOT NULL, "attachementTitile" character varying NOT NULL, "attachementTtype" character varying NOT NULL, "attachementPath" character varying NOT NULL, "attachementDscripton" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" integer, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedBy" integer, "generateTicketId" integer, CONSTRAINT "PK_11933a6b4b617f155e4c3e8fd07" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "employee" ("id" SERIAL NOT NULL, "nameEN" character varying NOT NULL, "nameBan" character varying, "fNameEN" character varying NOT NULL, "fNameBan" character varying, "mNameEN" character varying NOT NULL, "mNameBan" character varying, "mobileNo" character varying NOT NULL, "departmentId" integer NOT NULL, "designationId" integer NOT NULL, "presentAddress" character varying NOT NULL, "permanentAddress" character varying NOT NULL, "contactNo" character varying NOT NULL, "phone" character varying, "emailAddress" character varying NOT NULL, "orgId" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" integer, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedBy" integer, "active_status" integer NOT NULL DEFAULT '1', "generateTicketId" integer, CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "generateTicket" ("id" SERIAL NOT NULL, "titile" character varying NOT NULL, "descripton" character varying, "ticketStartDate" TIMESTAMP NOT NULL, "ticketEndDate" TIMESTAMP, "ticketStatus" integer NOT NULL DEFAULT '0', "ticketFeedback" character varying, "remarks" character varying, "orgId" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" integer, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedBy" integer, "active_status" integer NOT NULL DEFAULT '1', "ticketTypeId" integer, "ticketAssigned" integer, "ticketAssignedTo" integer, "clientId" integer, "projectId" integer, "clientsId" integer, CONSTRAINT "PK_8e05140f60c317e3f67d8b49142" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`ALTER TABLE "projects" ADD "createdBy" integer`);
    await queryRunner.query(`ALTER TABLE "projects" ADD "updatedBy" integer`);
    await queryRunner.query(`ALTER TABLE "client" ADD "createdBy" integer`);
    await queryRunner.query(`ALTER TABLE "client" ADD "updatedBy" integer`);
    await queryRunner.query(
      `ALTER TABLE "client" ALTER COLUMN "clientDescripton" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "client" ALTER COLUMN "phone" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "tiAttachments" ADD CONSTRAINT "FK_5874c04fbe8c000f4b58dcbd70b" FOREIGN KEY ("generateTicketId") REFERENCES "generateTicket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "employee" ADD CONSTRAINT "FK_0e6a1a1684181a7fcad8f01a7f2" FOREIGN KEY ("generateTicketId") REFERENCES "generateTicket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "generateTicket" ADD CONSTRAINT "FK_89745bdf3e0a98e9c97e2ee75a7" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "generateTicket" ADD CONSTRAINT "FK_94b0ab2eea70b1842b94ecca9a9" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "generateTicket" ADD CONSTRAINT "FK_269b56d87c5b16fb6503445bf39" FOREIGN KEY ("clientsId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "generateTicket" DROP CONSTRAINT "FK_269b56d87c5b16fb6503445bf39"`
    );
    await queryRunner.query(
      `ALTER TABLE "generateTicket" DROP CONSTRAINT "FK_94b0ab2eea70b1842b94ecca9a9"`
    );
    await queryRunner.query(
      `ALTER TABLE "generateTicket" DROP CONSTRAINT "FK_89745bdf3e0a98e9c97e2ee75a7"`
    );
    await queryRunner.query(
      `ALTER TABLE "employee" DROP CONSTRAINT "FK_0e6a1a1684181a7fcad8f01a7f2"`
    );
    await queryRunner.query(
      `ALTER TABLE "tiAttachments" DROP CONSTRAINT "FK_5874c04fbe8c000f4b58dcbd70b"`
    );
    await queryRunner.query(
      `ALTER TABLE "client" ALTER COLUMN "phone" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "client" ALTER COLUMN "clientDescripton" SET NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "updatedBy"`);
    await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "createdBy"`);
    await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "updatedBy"`);
    await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "createdBy"`);
    await queryRunner.query(`DROP TABLE "generateTicket"`);
    await queryRunner.query(`DROP TABLE "employee"`);
    await queryRunner.query(`DROP TABLE "tiAttachments"`);
  }
}
