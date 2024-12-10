import {ProjectEntity} from '@/entities/project.entity';
import {ProjectsController} from '@/projects/controllers/projects.controller';
import {ProjectDatabasesService} from '@/projects/services/project-databases.service';
import {
    PROJECT_EXTENSION,
    ProjectsStorageService
} from '@/projects/services/projects-storage.service';
import {ProjectsService} from '@/projects/services/projects.service';
import {UtilsModule} from '@/utils/utils.module';
import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([ProjectEntity]), UtilsModule],
    controllers: [ProjectsController],
    providers: [
        {
            provide: PROJECT_EXTENSION,
            useValue: '.aigraphr'
        },
        ProjectsService,
        ProjectsStorageService,
        ProjectDatabasesService
    ],
    exports: [ProjectsStorageService, ProjectDatabasesService]
})
export class ProjectsModule {}
