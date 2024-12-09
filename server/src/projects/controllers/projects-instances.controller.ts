import {ProjectInstanceDto} from '@/projects/dtos/project-instance.dto';
import {ProjectInstancesService} from '@/projects/services/project-instances.service';
import {DtoResponse} from '@/scaffold/decorators/dto-response';
import {ScaffoldSortDto} from '@/scaffold/dtos/scaffold-sort.dto';
import {scaffoldSort} from '@/scaffold/utils/scaffold-sort';
import {Controller, Get, Logger, Query} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';

/**
 * @deprecated ProjectsController instead
 */
@ApiTags('Projects')
@Controller('projects/instances')
export class ProjectsInstancesController {
    public constructor(
        private readonly projectInstances: ProjectInstancesService
    ) {}

    @Get()
    @ApiOperation({summary: 'List all project instances'})
    @DtoResponse(ProjectInstanceDto)
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
