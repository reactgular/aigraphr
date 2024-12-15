import {MigrationInterface, QueryRunner} from 'typeorm';

export class Update1734261309303 implements MigrationInterface {
    name = 'Update1734261309303';

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "settings"`);
        await queryRunner.query(`DROP TABLE "projects"`);
    }

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "projects" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "open" boolean NOT NULL DEFAULT (0), CONSTRAINT "UQ_2187088ab5ef2a918473cb99007" UNIQUE ("name"))`
        );
        await queryRunner.query(
            `CREATE TABLE "settings" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "test" varchar NOT NULL)`
        );
    }
}
