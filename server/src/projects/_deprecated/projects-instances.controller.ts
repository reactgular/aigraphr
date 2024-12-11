import {ProjectInstanceWithFileDto} from '@/projects/_deprecated/dtos/project-instance.dto';
import {ProjectOldInstancesService} from '@/projects/_deprecated/project-old-instances.service';
import {DtoResponse} from '@/scaffold/decorators/dto-response';
import {ScaffoldSortDto} from '@/scaffold/dtos/scaffold-sort.dto';
import {scaffoldSort} from '@/scaffold/utils/scaffold-sort';
import {Controller, Delete, Get, Logger, Post, Query} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';

/**
 * @deprecated
 */
@ApiTags('Projects')
@Controller('projects/instances')
export class ProjectsInstancesController {
    public constructor(
        private readonly projectInstances: ProjectOldInstancesService
    ) {}

    @Get()
    @ApiOperation({summary: 'List all project instances'})
    @DtoResponse(ProjectInstanceWithFileDto)
    public async index(
        @Query() {sort}: ScaffoldSortDto
    ): Promise<Array<ProjectInstanceWithFileDto>> {
        const projects = await this.projectInstances.projects();
        return scaffoldSort(projects, 'name', sort);
    }

    @Get(':instanceId')
    @ApiOperation({summary: 'Get project instance by ID'})
    @DtoResponse(ProjectInstanceWithFileDto)
    public async get(): Promise<ProjectInstanceWithFileDto | null> {
        return null;
    }

    @Post()
    @ApiOperation({
        summary: 'Create a new project instance',
        description:
            'Opens a project file and loads it into memory as an instance.'
    })
    @DtoResponse(ProjectInstanceWithFileDto)
    public async create(): Promise<Array<ProjectInstanceWithFileDto>> {
        const projects = await this.projectInstances.projects();
        return [];
    }

    @Delete()
    @ApiOperation({
        summary: 'Removes all project instances',
        description: 'Close all project files and removes them from memory.'
    })
    public async removeAll(): Promise<void> {}

    @Delete(':instanceId')
    @ApiOperation({
        summary: 'Removes a project instance',
        description: 'Close a project file and removes it from memory.'
    })
    public async remove(): Promise<void> {}

    // @Post will create a project
    // @Post('actives/:id') will open a project
    // @Delete('actives/:id') will close a project
}

const log = new Logger(ProjectsInstancesController.name);
