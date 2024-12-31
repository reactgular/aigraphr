import {MigrationInterface, QueryRunner} from 'typeorm';

export class Update1735389701836 implements MigrationInterface {
    name = 'Update1735389701836';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "nodes" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "workspaceId" integer NOT NULL)`
        );
        await queryRunner.query(
            `CREATE TABLE "edges" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "inputNodeId" integer NOT NULL, "outputNodeId" integer NOT NULL, "workspaceId" integer)`
        );
        await queryRunner.query(
            `CREATE TABLE "workspaces" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "description" text, "engine" varchar CHECK( "engine" IN ('javascript','python') ) NOT NULL, "name" varchar(128) NOT NULL)`
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
            `CREATE TABLE "temporary_edges" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "inputNodeId" integer NOT NULL, "outputNodeId" integer NOT NULL, "workspaceId" integer, CONSTRAINT "FK_c596c34d37b6836f20fc759913f" FOREIGN KEY ("inputNodeId") REFERENCES "nodes" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_a0d0529eb4f558ea81a9c6e88aa" FOREIGN KEY ("outputNodeId") REFERENCES "nodes" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_8ef38cb666821cf2b872eb06215" FOREIGN KEY ("workspaceId") REFERENCES "workspaces" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`
        );
        await queryRunner.query(
            `INSERT INTO "temporary_edges"("id", "inputNodeId", "outputNodeId", "workspaceId") SELECT "id", "inputNodeId", "outputNodeId", "workspaceId" FROM "edges"`
        );
        await queryRunner.query(`DROP TABLE "edges"`);
        await queryRunner.query(
            `ALTER TABLE "temporary_edges" RENAME TO "edges"`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "edges" RENAME TO "temporary_edges"`
        );
        await queryRunner.query(
            `CREATE TABLE "edges" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "inputNodeId" integer NOT NULL, "outputNodeId" integer NOT NULL, "workspaceId" integer)`
        );
        await queryRunner.query(
            `INSERT INTO "edges"("id", "inputNodeId", "outputNodeId", "workspaceId") SELECT "id", "inputNodeId", "outputNodeId", "workspaceId" FROM "temporary_edges"`
        );
        await queryRunner.query(`DROP TABLE "temporary_edges"`);
        await queryRunner.query(
            `ALTER TABLE "nodes" RENAME TO "temporary_nodes"`
        );
        await queryRunner.query(
            `CREATE TABLE "nodes" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "workspaceId" integer NOT NULL)`
        );
        await queryRunner.query(
            `INSERT INTO "nodes"("id", "workspaceId") SELECT "id", "workspaceId" FROM "temporary_nodes"`
        );
        await queryRunner.query(`DROP TABLE "temporary_nodes"`);
        await queryRunner.query(`DROP TABLE "workspaces"`);
        await queryRunner.query(`DROP TABLE "edges"`);
        await queryRunner.query(`DROP TABLE "nodes"`);
    }
}
