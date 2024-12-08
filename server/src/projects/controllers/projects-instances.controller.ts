import {ProjectInstanceDto} from '@/projects/dtos/project-instance.dto';
import {
    ProjectsInstancesListDto,
    ProjectsInstancesSort
} from '@/projects/dtos/projects-instances-list.dto';
import {ProjectInstancesService} from '@/projects/services/project-instances.service';
import {Controller, Get, Logger, Query} from '@nestjs/common';
import {ApiOkResponse, ApiTags} from '@nestjs/swagger';
import {orderBy} from 'lodash';

@ApiTags('Projects')
@Controller('projects/instances')
export class ProjectsInstancesController {
    public constructor(private readonly projects: ProjectInstancesService) {}

    @Get()
    @ApiOkResponse({
        type: [ProjectInstanceDto],
        description: 'List of projects loaded in memory'
    })
    public async index(
        @Query() {sort, sortBy}: ProjectsInstancesListDto
    ): Promise<Array<ProjectInstanceDto>> {
        const projects = await this.projects.projects();
        return orderBy(
            projects,
            [sort],
            sortBy === ProjectsInstancesSort.ASC ? 'asc' : 'desc'
        );
    }

    // @Post will create a project
    // @Post('actives/:id') will open a project
    // @Delete('actives/:id') will close a project
}

const log = new Logger(ProjectsInstancesController.name);
