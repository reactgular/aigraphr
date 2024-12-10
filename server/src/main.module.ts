import {AppModule} from '@/app/app.module';
import {VALIDATE_ENV_CONFIG} from '@/configs/env.config';
import {ProjectsModule} from '@/projects/projects.module';
import {ProjectsStorageService} from '@/projects/services/projects-storage.service';
import {WorkspacesModule} from '@/workspaces/workspaces.module';
import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {SequelizeModule} from '@nestjs/sequelize';

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
        SequelizeModule.forRootAsync({
            imports: [ProjectsModule],
            useFactory: async (projectsStorage: ProjectsStorageService) => ({
                name: 'app',
                dialect: 'sqlite',
                storage: await projectsStorage.databasePath(),
                models: []
            }),
            inject: [ProjectsStorageService]
        }),
        AppModule,
        ProjectsModule,
        WorkspacesModule
    ],
    controllers: [],
    providers: []
})
export class MainModule {}
