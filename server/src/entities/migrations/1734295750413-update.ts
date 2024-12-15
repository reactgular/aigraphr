import {MigrationInterface, QueryRunner} from 'typeorm';

export class Update1734295750413 implements MigrationInterface {
    name = 'Update1734295750413';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "settings" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "test" varchar NOT NULL)`
        );
        await queryRunner.query(
            `CREATE TABLE "projects" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, CONSTRAINT "UQ_2187088ab5ef2a918473cb99007" UNIQUE ("name"))`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "projects"`);
        await queryRunner.query(`DROP TABLE "settings"`);
    }
}
