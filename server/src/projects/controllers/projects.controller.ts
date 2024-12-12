import {
    ProjectCreateDto,
    ProjectDto,
    ProjectEntity,
    ProjectUpdateDto
} from '@/entities/project.entity';
import {ProjectsService} from '@/projects/services/projects.service';
import {createCrudController} from '@/scaffold/controllers/scaffold-crud.controller';
import {ScaffoldCrudService} from '@/scaffold/services/scaffold-crud.service';
import {Controller} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController extends createCrudController({
    entity: ProjectEntity,
    getDto: ProjectDto,
    createDto: ProjectCreateDto,
    updateDto: ProjectUpdateDto
}) {
    public constructor(projects: ProjectsService) {
        super(new ScaffoldCrudService(projects, projects));
    }
}
