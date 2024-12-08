import {ProjectInstanceDto} from '@/projects/dtos/project-instance.dto';
import {ProjectInstancesService} from '@/projects/services/project-instances.service';
import {ScaffoldSortDto} from '@/scaffold/dtos/scaffold-sort.dto';
import {scaffoldSort} from '@/scaffold/utils/scaffold-sort';
import {Controller, Get, Logger, Query} from '@nestjs/common';
import {ApiOkResponse, ApiTags} from '@nestjs/swagger';

@ApiTags('Projects')
@Controller('projects/instances')
export class ProjectsInstancesController {
    public constructor(
        private readonly projectInstances: ProjectInstancesService
    ) {}

    @Get()
    @ApiOkResponse({
        type: [ProjectInstanceDto],
        description: 'List of projects loaded in memory'
    })
    public async index(
        @Query() {sort}: ScaffoldSortDto
    ): Promise<Array<ProjectInstanceDto>> {
        const projects = await this.projectInstances.projects();
        return scaffoldSort(projects, 'name', sort);
    }

    // @Post will create a project
    // @Post('actives/:id') will open a project
    // @Delete('actives/:id') will close a project
}

const log = new Logger(ProjectsInstancesController.name);
