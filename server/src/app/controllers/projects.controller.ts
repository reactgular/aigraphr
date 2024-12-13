import {
    ProjectCreateDto,
    ProjectDto,
    ProjectUpdateDto
} from '@/entities/project.entity';
import {ScaBody} from '@/scaffold/decorators/sca-body';
import {ScaCreate} from '@/scaffold/decorators/sca-create';
import {ScaGet} from '@/scaffold/decorators/sca-get';
import {ScaPaginate} from '@/scaffold/decorators/sca-paginate';
import {ScaParamId} from '@/scaffold/decorators/sca-param-id';
import {ScaRemove} from '@/scaffold/decorators/sca-remove';
import {ScaUpdate} from '@/scaffold/decorators/sca-update';
import {Controller} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {ProjectsService} from '../services/projects.service';

@ApiTags('App')
@Controller('app/projects')
export class ProjectsController {
    public constructor(private readonly projects: ProjectsService) {
        //
    }

    @ScaPaginate(ProjectDto)
    public async index(): Promise<Array<ProjectDto>> {
        return await this.projects.index();
    }

    @ScaGet(ProjectDto)
    public async get(@ScaParamId() id: number): Promise<ProjectDto> {
        return await this.projects.get(id);
    }

    @ScaCreate(ProjectDto)
    public async create(
        @ScaBody(ProjectCreateDto) data: ProjectCreateDto
    ): Promise<ProjectDto> {
        return await this.projects.create(data);
    }

    @ScaUpdate(ProjectDto)
    public async update(
        @ScaParamId() id: number,
        @ScaBody(ProjectUpdateDto) data: ProjectUpdateDto
    ): Promise<ProjectDto> {
        return await this.projects.update(id, data);
    }

    @ScaRemove(ProjectDto)
    public async remove(@ScaParamId() id: number): Promise<void> {
        await this.projects.remove(id);
    }
}
