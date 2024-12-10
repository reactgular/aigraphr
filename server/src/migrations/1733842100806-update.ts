import {MigrationInterface, QueryRunner} from 'typeorm';

export class Update1733842100806 implements MigrationInterface {
    name = 'Update1733842100806';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "temporary_projects" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "open" boolean NOT NULL DEFAULT (0), "test" varchar NOT NULL)`
        );
        await queryRunner.query(
            `INSERT INTO "temporary_projects"("id", "name", "open") SELECT "id", "name", "open" FROM "projects"`
        );
        await queryRunner.query(`DROP TABLE "projects"`);
        await queryRunner.query(
            `ALTER TABLE "temporary_projects" RENAME TO "projects"`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "projects" RENAME TO "temporary_projects"`
        );
        await queryRunner.query(
            `CREATE TABLE "projects" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "open" boolean NOT NULL DEFAULT (0))`
        );
        await queryRunner.query(
            `INSERT INTO "projects"("id", "name", "open") SELECT "id", "name", "open" FROM "temporary_projects"`
        );
        await queryRunner.query(`DROP TABLE "temporary_projects"`);
    }
}
