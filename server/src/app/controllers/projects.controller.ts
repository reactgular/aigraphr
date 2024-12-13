import {
    ProjectCreateDto,
    ProjectDto,
    ProjectUpdateDto
} from '@/entities/project.entity';
import {scaCrudMixin} from '@/scaffold/mixins/sca-crud.mixin';
import {Controller} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {ProjectsService} from '../services/projects.service';

@ApiTags('Test')
@Controller('projects')
export class ProjectsController extends scaCrudMixin(
    ProjectDto,
    ProjectCreateDto,
    ProjectUpdateDto
) {
    public constructor(private readonly projects: ProjectsService) {
        super();
    }
}
