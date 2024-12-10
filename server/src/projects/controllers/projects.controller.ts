import {ProjectCreateDto} from '@/projects/dtos/project-create.dto';
import {ProjectPatchDto} from '@/projects/dtos/project-patch.dto';
import {ProjectDto} from '@/projects/dtos/project.dto';
import {ProjectsIndexDto} from '@/projects/dtos/projects-index.dto';
import {ProjectsService} from '@/projects/services/projects.service';
import {DtoResponse} from '@/scaffold/decorators/dto-response';
import {scaffoldSort} from '@/scaffold/utils/scaffold-sort';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query
} from '@nestjs/common';
import {ApiNotFoundResponse, ApiOperation, ApiTags} from '@nestjs/swagger';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
    public constructor(private readonly projects: ProjectsService) {}

    @Get()
    @ApiOperation({summary: 'List all projects'})
    @DtoResponse([ProjectDto])
    public async index(
        @Query() {sort, sortBy}: ProjectsIndexDto
    ): Promise<Array<ProjectDto>> {
        const storages = await this.projects.getProjects();
        return scaffoldSort(storages, sortBy, sort);
    }

    @Get(':id')
    @ApiOperation({summary: 'Get project by ID'})
    @ApiNotFoundResponse({description: 'Project was not found'})
    @DtoResponse(ProjectDto)
    public async get(@Param('id') id: string): Promise<ProjectDto> {
        return await this.projects.getProjectOrThrow(id);
    }

    @Post()
    @ApiOperation({summary: 'Create a new project.'})
    @DtoResponse(ProjectDto)
    public async create(@Body() data: ProjectCreateDto): Promise<ProjectDto> {
        return await this.projects.create(data.name);
    }

    @Patch(':id')
    @ApiOperation({summary: 'Update a project by ID'})
    @DtoResponse(ProjectDto)
    public async patch(
        @Param('id') id: string,
        @Body() {name, open}: ProjectPatchDto
    ): Promise<ProjectDto> {
        if (name) {
            return await this.projects.rename(id, name);
        } else if (open !== undefined) {
            return await this.projects.setOpen(id, open);
        }
    }

    @Delete(':id')
    @ApiOperation({summary: 'Delete a project by ID'})
    public async delete(@Param('id') id: string): Promise<void> {
        //
    }
}
