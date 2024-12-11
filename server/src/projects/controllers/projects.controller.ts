import {ProjectCreateEntity, ProjectEntity} from '@/entities/project.entity';
import {ProjectsService} from '@/projects/services/projects.service';
import {createCrudController} from '@/scaffold/controllers/scaffold-crud.controller';
import {Controller, Logger} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController extends createCrudController(
    ProjectEntity,
    ProjectCreateEntity
) {
    private readonly log = new Logger(ProjectsController.name);

    public constructor(private readonly projects: ProjectsService) {
        super(projects);
    }
}
