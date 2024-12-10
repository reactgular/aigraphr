import {AppModule} from '@/app/app.module';
import {VALIDATE_ENV_CONFIG} from '@/configs/env.config';
import {ProjectsModule} from '@/projects/projects.module';
import {ProjectsStorageService} from '@/projects/services/projects-storage.service';
import {UtilsModule} from '@/utils/utils.module';
import {WorkspacesModule} from '@/workspaces/workspaces.module';
import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {TypeOrmModuleOptions} from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            expandVariables: true,
            validationSchema: VALIDATE_ENV_CONFIG,
            validationOptions: {
                abortEarly: true
            }
        }),
        TypeOrmModule.forRootAsync({
            imports: [ProjectsModule],
            useFactory: async (projectsStorage: ProjectsStorageService) =>
                ({
                    type: 'sqlite',
                    database: await projectsStorage.database(),
                    entities: [`${__dirname}/entities/*.entity{.ts,.js}`],
                    subscribers: [
                        `${__dirname}/subscribers/*.subscriber{.ts,.js}`
                    ],
                    migrationsRun: true,
                    migrations: [`${__dirname}/migrations/*{.ts,.js}`]
                }) satisfies TypeOrmModuleOptions,
            inject: [ProjectsStorageService]
        }),
        AppModule,
        ProjectsModule,
        WorkspacesModule,
        UtilsModule
    ],
    controllers: [],
    providers: []
})
export class MainModule {}
