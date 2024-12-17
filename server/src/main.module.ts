import {AppModule} from '@/app/app.module';
import {VALIDATE_ENV_CONFIG} from '@/configs/env.config';
import {PROJECTS_STORAGE} from '@/projects/project.symbols';
import {ProjectsModule} from '@/projects/projects.module';
import {ProjectsStorage} from '@/projects/storages/projects-storage';
import {UtilsModule} from '@/utils/utils.module';
import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {TypeOrmModule, TypeOrmModuleOptions} from '@nestjs/typeorm';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            expandVariables: true,
            validationSchema: VALIDATE_ENV_CONFIG,
            validationOptions: {
                abortEarly: true
            },
            envFilePath:
                process.env.NODE_ENV === 'test'
                    ? // @BUG - if .env.test.local does not exist, it will not load .env.local and that will be a problem
                      ['.env.test.local', '.env.local', '.env']
                    : ['.env.local', '.env']
        }),
        TypeOrmModule.forRootAsync({
            imports: [ProjectsModule],
            useFactory: async (projectsStorage: ProjectsStorage) =>
                ({
                    type: 'sqlite',
                    database: await projectsStorage.rootDatabase(),
                    entities: [`${__dirname}/entities/*.entity{.ts,.js}`],
                    subscribers: [
                        `${__dirname}/entities/subscribers/*.subscriber{.ts,.js}`
                    ],
                    migrationsRun: true,
                    migrations: [`${__dirname}/entities/migrations/*{.ts,.js}`]
                }) satisfies TypeOrmModuleOptions,
            inject: [PROJECTS_STORAGE]
        }),
        AppModule,
        ProjectsModule,
        UtilsModule
    ],
    controllers: [],
    providers: []
})
export class MainModule {}
