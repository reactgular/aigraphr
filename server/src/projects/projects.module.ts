import {ProjectEntity} from '@/entities/project.entity';
import {ProjectGuard} from '@/projects/gaurds/project.guard';
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

@Module({
    imports: [TypeOrmModule.forFeature([ProjectEntity]), UtilsModule],
    controllers: [],
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
