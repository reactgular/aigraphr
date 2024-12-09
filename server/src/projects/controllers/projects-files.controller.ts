import {ProjectFileDto} from '@/projects/dtos/project-file.dto';
import {ProjectsFilesIndexDto} from '@/projects/dtos/projects-files-index.dto';
import {ProjectFilesService} from '@/projects/services/project-files.service';
import {DtoResponse} from '@/scaffold/decorators/dto-response';
import {scaffoldSort} from '@/scaffold/utils/scaffold-sort';
import {Controller, Get, Logger, Param, Post, Query} from '@nestjs/common';
import {ApiNotFoundResponse, ApiOperation, ApiTags} from '@nestjs/swagger';

@ApiTags('Projects')
@Controller('projects/files')
export class ProjectsFilesController {
    public constructor(private readonly files: ProjectFilesService) {}

    @Get()
    @ApiOperation({summary: 'List all project files'})
    @DtoResponse([ProjectFileDto])
    public async index(
        @Query() {sort, sortBy}: ProjectsFilesIndexDto
    ): Promise<Array<ProjectFileDto>> {
        const storages = await this.files.getFiles();
        return scaffoldSort(storages, sortBy, sort);
    }

    @Get(':fileId')
    @ApiOperation({summary: 'Get project file by ID'})
    @ApiNotFoundResponse({description: 'Project file not found'})
    @DtoResponse(ProjectFileDto)
    public async get(@Param('fileId') id: string): Promise<ProjectFileDto> {
        return await this.files.getFileOrThrow(id);
    }

    @Post()
    @ApiOperation({
        summary: 'Create a new project file.',
        description:
            'To create a new profile file the server must create an empty instance of the project and load it, but if the profile file already exists. then the server must load the existing instance.'
    })
    @DtoResponse(ProjectFileDto)
    public async create(): Promise<ProjectFileDto> {
        return null;
    }
}

const log = new Logger(ProjectsFilesController.name);
