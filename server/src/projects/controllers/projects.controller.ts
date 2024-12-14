import {
    ProjectCreateDto,
    ProjectDto,
    ProjectEntity,
    ProjectUpdateDto
} from '@/entities/project.entity';
import {ScaCrudService} from '@/scaffold/crud/sca-crud.service';
import {scaCrudMixin} from '@/scaffold/mixins/sca-crud.mixin';
import {Controller} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {ProjectsService} from '../services/projects.service';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController extends scaCrudMixin({
    paramId: 'projectId',
    dto: ProjectDto,
    createDto: ProjectCreateDto,
    updateDto: ProjectUpdateDto
}) {
    public constructor(private readonly projects: ProjectsService) {
        super();
    }

    public crud(): ScaCrudService<ProjectEntity> {
        return this.projects;
    }
}
