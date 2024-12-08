import {ProjectInstanceDto} from '@/projects/dtos/project-instance.dto';
import {ProjectsInstancesListDto} from '@/projects/dtos/projects-instances-list.dto';
import {ProjectInstancesService} from '@/projects/services/project-instances.service';
import {Controller, Get, Logger, Query} from '@nestjs/common';
import {ApiOkResponse, ApiTags} from '@nestjs/swagger';

@ApiTags('Projects')
@Controller('projects/instances')
export class ProjectsInstancesController {
    public constructor(private readonly projects: ProjectInstancesService) {}

    @Get()
    @ApiOkResponse({
        type: ProjectInstanceDto,
        isArray: true,
        description: 'List of projects loaded in memory'
    })
    public async get(
        @Query() query: ProjectsInstancesListDto
    ): Promise<Array<ProjectInstanceDto>> {
        log.debug(`Query: ${JSON.stringify(query)}`);

        // @todo we could do the sorting and filtering here

        return this.projects.list(query);
    }

    // @Post will create a project
    // @Post('actives/:id') will open a project
    // @Delete('actives/:id') will close a project
}

const log = new Logger(ProjectsInstancesController.name);
