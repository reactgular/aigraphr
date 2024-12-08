import {ProjectInstanceDto} from '@/projects/dtos/project-instance.dto';
import {ProjectStorageCreateDto} from '@/projects/dtos/project-storage-create.dto';
import {ProjectStorageDto} from '@/projects/dtos/project-storage.dto';
import {ProjectInstancesService} from '@/projects/services/project-instances.service';
import {ProjectStoragesService} from '@/projects/services/project-storages.service';
import {DtoResponse} from '@/scaffold/decorators/dto-response';
import {IsKeyOf} from '@/scaffold/decorators/is-keyof.decorator';
import {
    IsSortEnum,
    ScaffoldSort
} from '@/scaffold/decorators/is-sort-enum.decorator';
import {scaffoldSort} from '@/scaffold/utils/scaffold-sort';
import {
    Body,
    Controller,
    Get,
    Logger,
    Param,
    Post,
    Query
} from '@nestjs/common';
import {ApiNotFoundResponse, ApiOperation, ApiTags} from '@nestjs/swagger';

export class ProjectsStoragesIndexDto {
    @IsSortEnum()
    sort: ScaffoldSort = ScaffoldSort.ASC;

    @IsKeyOf<ProjectStorageDto>(['createdAt', 'fileName'], false)
    sortBy: keyof ProjectStorageDto = 'createdAt';
}

@ApiTags('Projects')
@Controller('projects/storages')
export class ProjectsStoragesController {
    public constructor(
        private readonly projectInstances: ProjectInstancesService,
        private readonly projectStorages: ProjectStoragesService
    ) {}

    @Get()
    @ApiOperation({summary: 'List all project storages'})
    @DtoResponse([ProjectInstanceDto])
    public async index(
        @Query() {sort, sortBy}: ProjectsStoragesIndexDto
    ): Promise<Array<ProjectStorageDto>> {
        const storages = await this.projectStorages.getAll();
        return scaffoldSort(storages, sortBy, sort);
    }

    @Get(':id')
    @ApiOperation({summary: 'Get project storage by id'})
    @ApiNotFoundResponse({description: 'Project storage not found'})
    @DtoResponse(ProjectInstanceDto)
    public async get(@Param('id') id: string): Promise<ProjectStorageDto> {
        return await this.projectStorages.getOrThrow(id);
    }

    @Post()
    @ApiOperation({
        description:
            'Creates a new Sqlite database for the project and opens it as a project instance.'
    })
    @DtoResponse(ProjectInstanceDto)
    public async create(
        @Body() data: ProjectStorageCreateDto
    ): Promise<ProjectInstanceDto> {
        const storage = await this.projectStorages.create(data.name);
        return await this.projectInstances.open(storage);
    }
}

const log = new Logger(ProjectsStoragesController.name);
