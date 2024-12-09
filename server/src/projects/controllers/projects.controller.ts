import {ProjectDto} from '@/projects/dtos/project.dto';
import {ProjectsService} from '@/projects/services/projects.service';
import {DtoResponse} from '@/scaffold/decorators/dto-response';
import {ScaffoldSortDto} from '@/scaffold/dtos/scaffold-sort.dto';
import {scaffoldSort} from '@/scaffold/utils/scaffold-sort';
import {Controller, Get, Query} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
    public constructor(private readonly projects: ProjectsService) {
        //...
    }

    @Get()
    @ApiOperation({summary: 'List all project'})
    @DtoResponse(ProjectDto)
    public async index(
        @Query() {sort}: ScaffoldSortDto
    ): Promise<Array<ProjectDto>> {
        const projects = await this.projects.projects();
        return scaffoldSort(projects, 'fileName', sort);
    }
}
