import {MigrationInterface, QueryRunner} from 'typeorm';

export class Update1734303568053 implements MigrationInterface {
    name = 'Update1734303568053';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "workspaces" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "test" varchar NOT NULL)`
        );
        await queryRunner.query(
            `CREATE TABLE "nodes" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "test" varchar NOT NULL)`
        );
        await queryRunner.query(
            `CREATE TABLE "edges" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "test" varchar NOT NULL)`
        );
        await queryRunner.query(
            `CREATE TABLE "attributes" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "test" varchar NOT NULL)`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "attributes"`);
        await queryRunner.query(`DROP TABLE "edges"`);
        await queryRunner.query(`DROP TABLE "nodes"`);
        await queryRunner.query(`DROP TABLE "workspaces"`);
    }
}
