import {AppModule} from '@/app/app.module';
import {ProjectEntity} from '@/entities/project.entity';
import {WorkspacesController} from '@/projects/controllers/workspaces.controller';
import {WORKSPACES_REPOSITORY} from '@/projects/project-symbols';
import {ProjectDatabasesService} from '@/projects/services/project-databases.service';
import {ProjectEntityService} from '@/projects/services/project-entity.service';
import {
    PROJECT_EXTENSION,
    ProjectsStorageService
} from '@/projects/services/projects-storage.service';
import {WorkspacesService} from '@/projects/services/workspaces.service';
import {UtilsModule} from '@/utils/utils.module';
import {Module, Scope} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ProjectGuard} from './gaurds/project.guard';

@Module({
    imports: [
        AppModule,
        TypeOrmModule.forFeature([ProjectEntity]),
        UtilsModule
    ],
    controllers: [WorkspacesController],
    providers: [
        ProjectGuard,
        {
            provide: PROJECT_EXTENSION,
            useValue: '.aigraphr'
        },
        ProjectsStorageService,
        ProjectDatabasesService,
        {
            scope: Scope.REQUEST,
            provide: WORKSPACES_REPOSITORY,
            useFactory: async (databases: ProjectDatabasesService) =>
                databases.workspaces(),
            inject: [ProjectDatabasesService]
        },
        ProjectEntityService,
        WorkspacesService
    ],
    exports: [
        ProjectGuard,
        ProjectsStorageService,
        ProjectDatabasesService,
        ProjectEntityService,
        WORKSPACES_REPOSITORY
    ]
})
export class ProjectsModule {}
