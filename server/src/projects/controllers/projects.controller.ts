import {ProjectEntity} from '@/models/project.entity';
import {ProjectsIndexDto} from '@/projects/dtos/projects-index.dto';
import {ProjectsService} from '@/projects/services/projects.service';
import {DtoResponse} from '@/scaffold/decorators/dto-response';
import {scaffoldSort} from '@/scaffold/utils/scaffold-sort';
import {Controller, Get, Logger, Query} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
    private readonly log = new Logger(ProjectsController.name);

    public constructor(private readonly projects: ProjectsService) {
        //
    }

    @Get()
    @ApiOperation({summary: 'List all projects'})
    @DtoResponse([ProjectEntity])
    public async index(
        @Query() {sort, sortBy}: ProjectsIndexDto
    ): Promise<Array<ProjectEntity>> {
        const storages = await this.projects.findAll();
        // @todo we can do this with the repository now
        return scaffoldSort(storages, sortBy, sort);
    }
}
