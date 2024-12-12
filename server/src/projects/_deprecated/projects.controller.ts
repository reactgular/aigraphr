import {
    ProjectCreateDto,
    ProjectDto,
    ProjectUpdateDto
} from '@/entities/project.entity';
import {ProjectsService} from '@/projects/_deprecated/projects.service';
import {createCrudController} from '@/scaffold/_deprecated/create-crud.controller';
import {ScaffoldCrudService} from '@/scaffold/_deprecated/scaffold-crud.service';
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
