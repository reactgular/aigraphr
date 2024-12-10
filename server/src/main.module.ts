import {AppModule} from '@/app/app.module';
import {VALIDATE_ENV_CONFIG} from '@/configs/env.config';
import {ProjectEntity} from '@/models/project.entity';
import {ProjectsModule} from '@/projects/projects.module';
import {ProjectsStorageService} from '@/projects/services/projects-storage.service';
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
                    entities: [ProjectEntity]
                }) satisfies TypeOrmModuleOptions,
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
