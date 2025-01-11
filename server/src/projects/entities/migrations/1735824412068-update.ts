import {MigrationInterface, QueryRunner} from 'typeorm';

export class Update1735824412068 implements MigrationInterface {
    name = 'Update1735824412068';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "temporary_workspaces" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "description" text, "engine" varchar CHECK( "engine" IN ('javascript','python') ) NOT NULL, "name" varchar(128) NOT NULL)`
        );
        await queryRunner.query(
            `INSERT INTO "temporary_workspaces"("id", "description", "engine", "name") SELECT "id", "description", "engine", "name" FROM "workspaces"`
        );
        await queryRunner.query(`DROP TABLE "workspaces"`);
        await queryRunner.query(
            `ALTER TABLE "temporary_workspaces" RENAME TO "workspaces"`
        );
        await queryRunner.query(
            `CREATE TABLE "temporary_nodes" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "workspaceId" integer NOT NULL, CONSTRAINT "FK_b7a7995260152c818f25becfcc5" FOREIGN KEY ("workspaceId") REFERENCES "workspaces" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`
        );
        await queryRunner.query(
            `INSERT INTO "temporary_nodes"("id", "workspaceId") SELECT "id", "workspaceId" FROM "nodes"`
        );
        await queryRunner.query(`DROP TABLE "nodes"`);
        await queryRunner.query(
            `ALTER TABLE "temporary_nodes" RENAME TO "nodes"`
        );
        await queryRunner.query(
            `CREATE TABLE "temporary_nodes" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "workspaceId" integer NOT NULL, "grNodeId" integer NOT NULL, "name" varchar(128) NOT NULL, CONSTRAINT "FK_b7a7995260152c818f25becfcc5" FOREIGN KEY ("workspaceId") REFERENCES "workspaces" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`
        );
        await queryRunner.query(
            `INSERT INTO "temporary_nodes"("id", "workspaceId") SELECT "id", "workspaceId" FROM "nodes"`
        );
        await queryRunner.query(`DROP TABLE "nodes"`);
        await queryRunner.query(
            `ALTER TABLE "temporary_nodes" RENAME TO "nodes"`
        );
        await queryRunner.query(
            `CREATE TABLE "temporary_workspaces" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "description" text, "engine" varchar CHECK( "engine" IN ('javascript','python') ) NOT NULL, "name" varchar(128) NOT NULL)`
        );
        await queryRunner.query(
            `INSERT INTO "temporary_workspaces"("id", "description", "engine", "name") SELECT "id", "description", "engine", "name" FROM "workspaces"`
        );
        await queryRunner.query(`DROP TABLE "workspaces"`);
        await queryRunner.query(
            `ALTER TABLE "temporary_workspaces" RENAME TO "workspaces"`
        );
        await queryRunner.query(
            `CREATE UNIQUE INDEX "IDX_ea11283e8d453234eec8810162" ON "nodes" ("workspaceId", "name") `
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_ea11283e8d453234eec8810162"`);
        await queryRunner.query(
            `ALTER TABLE "workspaces" RENAME TO "temporary_workspaces"`
        );
        await queryRunner.query(
            `CREATE TABLE "workspaces" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "description" text, "engine" varchar CHECK( "engine" IN ('javascript','python') ) NOT NULL, "name" varchar(128) NOT NULL)`
        );
        await queryRunner.query(
            `INSERT INTO "workspaces"("id", "description", "engine", "name") SELECT "id", "description", "engine", "name" FROM "temporary_workspaces"`
        );
        await queryRunner.query(`DROP TABLE "temporary_workspaces"`);
        await queryRunner.query(
            `ALTER TABLE "nodes" RENAME TO "temporary_nodes"`
        );
        await queryRunner.query(
            `CREATE TABLE "nodes" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "workspaceId" integer NOT NULL, CONSTRAINT "FK_b7a7995260152c818f25becfcc5" FOREIGN KEY ("workspaceId") REFERENCES "workspaces" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`
        );
        await queryRunner.query(
            `INSERT INTO "nodes"("id", "workspaceId") SELECT "id", "workspaceId" FROM "temporary_nodes"`
        );
        await queryRunner.query(`DROP TABLE "temporary_nodes"`);
        await queryRunner.query(
            `ALTER TABLE "nodes" RENAME TO "temporary_nodes"`
        );
        await queryRunner.query(
            `CREATE TABLE "nodes" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "workspaceId" integer NOT NULL, "type" varchar NOT NULL, CONSTRAINT "FK_b7a7995260152c818f25becfcc5" FOREIGN KEY ("workspaceId") REFERENCES "workspaces" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`
        );
        await queryRunner.query(
            `INSERT INTO "nodes"("id", "workspaceId") SELECT "id", "workspaceId" FROM "temporary_nodes"`
        );
        await queryRunner.query(`DROP TABLE "temporary_nodes"`);
        await queryRunner.query(
            `ALTER TABLE "workspaces" RENAME TO "temporary_workspaces"`
        );
        await queryRunner.query(
            `CREATE TABLE "workspaces" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "description" text, "engine" varchar CHECK( "engine" IN ('javascript','python') ) NOT NULL, "name" varchar(128) NOT NULL)`
        );
        await queryRunner.query(
            `INSERT INTO "workspaces"("id", "description", "engine", "name") SELECT "id", "description", "engine", "name" FROM "temporary_workspaces"`
        );
        await queryRunner.query(`DROP TABLE "temporary_workspaces"`);
    }
}
