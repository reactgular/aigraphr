import {ProjectStorageDto} from '@/projects/dtos/project-storage.dto';
import {ProjectStoragesService} from '@/projects/services/project-storages.service';
import {IsKeyOf} from '@/scaffold/decorators/is-keyof.decorator';
import {
    IsScaffoldSort,
    ScaffoldSort
} from '@/scaffold/decorators/scaffold-sort.decorator';
import {scaffoldSort} from '@/scaffold/utils/scaffold-sort';
import {Controller, Get, Logger, Param, Query} from '@nestjs/common';
import {ApiNotFoundResponse, ApiOkResponse, ApiTags} from '@nestjs/swagger';

export class ProjectsStoragesIndexDto {
    @IsScaffoldSort()
    sort: ScaffoldSort = ScaffoldSort.ASC;

    @IsKeyOf<ProjectStorageDto>(['createdAt', 'fileName'], false)
    sortBy: keyof ProjectStorageDto = 'createdAt';
}

@ApiTags('Projects')
@Controller('projects/storages')
export class ProjectsStoragesController {
    public constructor(
        private readonly projectStorages: ProjectStoragesService
    ) {}

    @Get()
    @ApiOkResponse({
        type: ProjectStorageDto,
        isArray: true
    })
    public async index(
        @Query() {sort, sortBy}: ProjectsStoragesIndexDto
    ): Promise<Array<ProjectStorageDto>> {
        const storages = await this.projectStorages.getAll();
        return scaffoldSort(storages, sortBy, sort);
    }

    @Get(':id')
    @ApiOkResponse({type: ProjectStorageDto})
    @ApiNotFoundResponse({description: 'Project storage not found'})
    public async get(@Param('id') id: string): Promise<ProjectStorageDto> {
        return await this.projectStorages.getOrThrow(id);
    }

    //
}

const log = new Logger(ProjectsStoragesController.name);
