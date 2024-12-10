import {MigrationInterface, QueryRunner} from 'typeorm';

export class Update1733841866025 implements MigrationInterface {
    name = 'Update1733841866025';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "projects" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "open" boolean NOT NULL DEFAULT (0))`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "projects"`);
    }
}
