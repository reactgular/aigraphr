import {
    ProjectCreateDto,
    ProjectDto,
    ProjectUpdateDto
} from '@/entities/project.entity';
import {ProjectsService} from '@/projects/services/projects.service';
import {createCrudController} from '@/scaffold/controllers/create-crud.controller';
import {ScaffoldIdDto} from '@/scaffold/dtos/scaffold-id.dto';
import {ScaffoldCrudService} from '@/scaffold/services/scaffold-crud.service';
import {Controller} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController extends createCrudController({
    getDto: ProjectDto,
    getParams: {
        params: [
            {
                name: 'id',
                type: Number,
                required: true
            }
        ],
        dto: ScaffoldIdDto
    },
    createDto: ProjectCreateDto,
    updateDto: ProjectUpdateDto
}) {
    public constructor(projects: ProjectsService) {
        super(new ScaffoldCrudService(projects, projects));
    }
}
