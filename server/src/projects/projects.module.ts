import {ProjectEntity} from '@/entities/project.entity';
import {ProjectsController} from '@/projects/controllers/projects.controller';
import {WORKSPACES_REPOSITORY} from '@/projects/project-symbols';
import {ProjectDatabasesService} from '@/projects/services/project-databases.service';
import {ProjectEntityService} from '@/projects/services/project-entity.service';
import {
    PROJECT_EXTENSION,
    ProjectsStorageService
} from '@/projects/services/projects-storage.service';
import {ProjectsService} from '@/projects/services/projects.service';
import {UtilsModule} from '@/utils/utils.module';
import {Module, Scope} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ProjectGuard} from './gaurds/project.guard';

@Module({
    imports: [TypeOrmModule.forFeature([ProjectEntity]), UtilsModule],
    controllers: [ProjectsController],
    providers: [
        ProjectGuard,
        {
            provide: PROJECT_EXTENSION,
            useValue: '.aigraphr'
        },
        ProjectsService,
        ProjectsStorageService,
        ProjectDatabasesService,
        {
            scope: Scope.REQUEST,
            provide: WORKSPACES_REPOSITORY,
            useFactory: async (databases: ProjectDatabasesService) =>
                databases.workspaces(),
            inject: [ProjectDatabasesService]
        },
        ProjectEntityService
    ],
    exports: [
        ProjectGuard,
        ProjectsService,
        ProjectsStorageService,
        ProjectDatabasesService,
        ProjectEntityService,
        WORKSPACES_REPOSITORY
    ]
})
export class ProjectsModule {}
