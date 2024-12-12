import {createCrudController} from '@/_deprecated/create-crud.controller';
import {ProjectsService} from '@/_deprecated/projects.service';
import {ScaffoldCrudService} from '@/_deprecated/scaffold-crud.service';
import {
    ProjectCreateDto,
    ProjectDto,
    ProjectUpdateDto
} from '@/entities/project.entity';
import {Controller} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';

/**
 * @deprecated
 */
@ApiTags('Projects')
@Controller('projects')
export class ProjectsController extends createCrudController({
    getDto: ProjectDto,
    createDto: ProjectCreateDto,
    updateDto: ProjectUpdateDto
}) {
    public constructor(projects: ProjectsService) {
        super(new ScaffoldCrudService(projects, projects));
    }
}
