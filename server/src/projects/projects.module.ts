import {ProjectEntity} from '@/entities/project.entity';
import {ProjectsController} from '@/projects/controllers/projects.controller';
import {ProjectGuard} from '@/projects/gaurds/project.guard';
import {ProjectDatabasesService} from '@/projects/services/project-databases.service';
import {WORKSPACES_REPOSITORY} from '@/projects/services/project-repositories';
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
            useFactory: (databases: ProjectDatabasesService) =>
                databases.workspaces(),
            inject: [ProjectDatabasesService]
        }
    ],
    exports: [
        ProjectGuard,
        ProjectsService,
        ProjectsStorageService,
        ProjectDatabasesService,
        WORKSPACES_REPOSITORY
    ]
})
export class ProjectsModule {}
