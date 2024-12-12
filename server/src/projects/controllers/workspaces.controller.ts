import {ProjectsService} from '@/app/services/projects.service';
import {ProjectDto} from '@/entities/project.entity';
import {
    WorkspaceCreateDto,
    WorkspaceDto,
    WorkspaceUpdateDto
} from '@/projects/entities/workspace.entity';
import {Response} from '@/scaffold/decorators/response';
import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';

@ApiTags('Editor')
@Controller('projects/:projectId/workspaces')
export class WorkspacesController {
    public constructor(private readonly projects: ProjectsService) {
        //
    }

    @Get()
    @ApiOperation({summary: `List all workspaces`})
    @Response([WorkspaceDto])
    public async index(): Promise<Array<WorkspaceDto>> {
        return await this.projects.index();
    }

    @Get(':id')
    @ApiOperation({summary: `Get workspace by ID`})
    @Response(WorkspaceDto)
    public async get(@Param('id') id: number): Promise<WorkspaceDto> {
        return await this.projects.get(id);
    }

    @Post()
    @ApiOperation({summary: `Create a new workspace`})
    @Response(WorkspaceDto)
    public async create(
        @Body() data: WorkspaceCreateDto
    ): Promise<WorkspaceDto> {
        return await this.projects.create(data);
    }

    @Post(':id')
    @ApiOperation({summary: `Update a workspace by ID`})
    @Response(WorkspaceDto)
    public async update(
        @Param('id') id: number,
        @Body() data: WorkspaceUpdateDto
    ): Promise<ProjectDto> {
        return await this.projects.update(id, data);
    }

    @Delete(':id')
    @ApiOperation({summary: `Delete a workspace by ID`})
    public async remove(@Param('id') id: number): Promise<void> {
        return await this.projects.remove(id);
    }
}
