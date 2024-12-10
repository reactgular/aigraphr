import * as dotenv from 'dotenv';
import * as process from 'node:process';
import {DataSource} from 'typeorm';

dotenv.config();

const dataSource = new DataSource({
    type: 'sqlite',
    database: process.env.PROJECTS_FOLDER + '/aigraphr.sqlite',
    entities: [`${__dirname}/entities/*.entity{.ts,.js}`],
    subscribers: [`${__dirname}/subscribers/*.subscriber{.ts,.js}`],
    migrationsRun: false,
    migrations: [`${__dirname}/migrations/*{.ts,.js}`]
});

export default dataSource;
