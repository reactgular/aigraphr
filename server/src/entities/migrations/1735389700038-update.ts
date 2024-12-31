import {MigrationInterface, QueryRunner} from 'typeorm';

export class Update1735389700038 implements MigrationInterface {
    name = 'Update1735389700038';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "projects" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "encrypted" boolean NOT NULL, "fileName" varchar(128) NOT NULL, "name" varchar(128) NOT NULL, CONSTRAINT "UQ_5a55c73d96f53ed18fc5b839650" UNIQUE ("fileName"))`
        );
        await queryRunner.query(
            `CREATE TABLE "settings" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "test" varchar NOT NULL)`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "settings"`);
        await queryRunner.query(`DROP TABLE "projects"`);
    }
}
