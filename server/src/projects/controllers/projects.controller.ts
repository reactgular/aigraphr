import {ProjectDto} from '@/entities/project.entity';
import {ProjectsService} from '@/projects/services/projects.service';
import {ScaffoldGet, ScaffoldGetType} from '@/scaffold/decorators/scaffold-get';
import {
    ScaffoldIndex,
    ScaffoldIndexType
} from '@/scaffold/decorators/scaffold-index';
import {Controller} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';

const Index = ScaffoldIndex(ProjectDto);
type Index = ScaffoldIndexType<ProjectDto>;

const Get = ScaffoldGet(ProjectDto);
type Get = ScaffoldGetType<ProjectDto>;

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
    public constructor(private readonly projects: ProjectsService) {}

    @Index.Method()
    public async index(
        @Index.Param() params: Index['Param'],
        @Index.Query() query: Index['Query'],
        @Index.Body() body: Index['Body']
    ): Index['Response'] {
        throw new Error('Method not implemented.');
    }

    @Get.Method()
    public async get(
        @Get.Param() params: Get['Param'],
        @Get.Query() query: Get['Query'],
        @Get.Body() body: Get['Body']
    ): Get['Response'] {
        throw new Error('Method not implemented.');
    }
}
