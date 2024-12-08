import {ProjectStorageDto} from '@/projects/dtos/project-storage.dto';
import {ProjectsInstancesListDto} from '@/projects/dtos/projects-instances-list.dto';
import {ProjectStoragesService} from '@/projects/services/project-storages.service';
import {
    Controller,
    Get,
    Logger,
    NotFoundException,
    Param,
    Query
} from '@nestjs/common';
import {ApiNotFoundResponse, ApiOkResponse, ApiTags} from '@nestjs/swagger';

@ApiTags('Projects')
@Controller('projects/storages')
export class ProjectsStoragesController {
    public constructor(
        private readonly projectStorages: ProjectStoragesService
    ) {
        log.debug('ProjectsStoragesController instantiated');
    }

    @Get()
    @ApiOkResponse({
        type: ProjectStorageDto,
        isArray: true
    })
    public async index(
        @Query() query: ProjectsInstancesListDto
    ): Promise<Array<ProjectStorageDto>> {
        log.debug(`Query: ${JSON.stringify(query)}`);

        // @todo we could do the sorting and filtering here

        return await this.projectStorages.getAll();
    }

    @Get(':id')
    @ApiOkResponse({type: ProjectStorageDto})
    @ApiNotFoundResponse({description: 'Project storage not found'})
    public async get(@Param('id') id: string): Promise<ProjectStorageDto> {
        const item = await this.projectStorages.get(id);
        if (!item) {
            throw new NotFoundException(
                `Project storage with ID "${id}" not found`
            );
        }
        return item;
    }

    //
}

const log = new Logger(ProjectsStoragesController.name);
