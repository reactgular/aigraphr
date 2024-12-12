import {
    ProjectCreateDto,
    ProjectDto,
    ProjectUpdateDto
} from '@/entities/project.entity';
import {Response} from '@/scaffold/decorators/response';
import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {ProjectsService} from '../services/projects.service';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
    public constructor(private readonly projects: ProjectsService) {
        //
    }

    @Get()
    @ApiOperation({summary: `List all projects`})
    @Response([ProjectDto])
    public async index(): Promise<Array<ProjectDto>> {
        return await this.projects.index();
    }

    @Get(':id')
    @ApiOperation({summary: `Get project by ID`})
    @Response(ProjectDto)
    public async get(@Param('id') id: number): Promise<ProjectDto> {
        return await this.projects.get(id);
    }

    @Post()
    @ApiOperation({summary: `Create a new project`})
    @Response(ProjectDto)
    public async create(@Body() data: ProjectCreateDto): Promise<ProjectDto> {
        return await this.projects.create(data);
    }

    @Post(':id')
    @ApiOperation({summary: `Update a project by ID`})
    @Response(ProjectDto)
    public async update(
        @Param('id') id: number,
        @Body() data: ProjectUpdateDto
    ): Promise<ProjectDto> {
        return await this.projects.update(id, data);
    }

    @Delete(':id')
    @ApiOperation({summary: `Delete a project by ID`})
    public async remove(@Param('id') id: number): Promise<void> {
        return await this.projects.remove(id);
    }
}
