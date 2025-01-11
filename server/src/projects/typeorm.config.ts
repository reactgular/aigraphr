import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as process from 'node:process';
import {DataSource} from 'typeorm';

dotenv.config();

const folder = process.env.PROJECTS_FOLDER;
if (!folder) {
    throw new Error('PROJECTS_FOLDER is not defined');
}

const database = folder + '/_project_migration.sqlite';

if (!fs.existsSync(database)) {
    console.warn(`Database file not found: ${database}`);
}

const dataSource = new DataSource({
    type: 'sqlite',
    database,
    entities: [`${__dirname}/entities/*.entity{.ts,.js}`],
    subscribers: [`${__dirname}/entities/subscribers/*.subscriber{.ts,.js}`],
    migrationsRun: false,
    migrations: [`${__dirname}/entities/migrations/*{.ts,.js}`]
});

export default dataSource;
