import {ProjectFileWithInstanceDto} from '@/projects/_deprecated/dtos/project-file.dto';
import {ProjectsIndexDto} from '@/projects/_deprecated/dtos/projects-index.dto';
import {ProjectOldFilesService} from '@/projects/_deprecated/project-old-files.service';
import {DtoResponse} from '@/scaffold/decorators/dto-response';
import {scaffoldSort} from '@/scaffold/utils/scaffold-sort';
import {Controller, Get, Logger, Param, Post, Query} from '@nestjs/common';
import {ApiNotFoundResponse, ApiOperation, ApiTags} from '@nestjs/swagger';

/**
 * @deprecated
 */
@ApiTags('Projects')
@Controller('projects/files')
export class ProjectsFilesController {
    public constructor(private readonly files: ProjectOldFilesService) {}

    @Get()
    @ApiOperation({summary: 'List all project files'})
    @DtoResponse([ProjectFileWithInstanceDto])
    public async index(
        @Query() {sort, sortBy}: ProjectsIndexDto
    ): Promise<Array<ProjectFileWithInstanceDto>> {
        const storages = await this.files.getFiles();
        return scaffoldSort(storages, sortBy, sort);
    }

    @Get(':fileId')
    @ApiOperation({summary: 'Get project file by ID'})
    @ApiNotFoundResponse({description: 'Project file not found'})
    @DtoResponse(ProjectFileWithInstanceDto)
    public async get(
        @Param('fileId') id: string
    ): Promise<ProjectFileWithInstanceDto | undefined> {
        return await this.files.getFileOrThrow(id);
    }

    @Post()
    @ApiOperation({
        summary: 'Create a new project file.',
        description:
            'To create a new profile file the server must create an empty instance of the project and load it, but if the profile file already exists. then the server must load the existing instance.'
    })
    @DtoResponse(ProjectFileWithInstanceDto)
    public async create(): Promise<ProjectFileWithInstanceDto | null> {
        return null;
    }
}

const log = new Logger(ProjectsFilesController.name);
