import {
    ProjectCreateDto,
    ProjectDto,
    ProjectUpdateDto
} from '@/entities/project.entity';
import {ScaBody} from '@/scaffold/decorators/sca-body';
import {ScaCreate, ScaCreateResponse} from '@/scaffold/decorators/sca-create';
import {ScaGet, ScaGetResponse} from '@/scaffold/decorators/sca-get';
import {
    ScaPaginate,
    ScaPaginateResponse
} from '@/scaffold/decorators/sca-paginate';
import {ScaParamId} from '@/scaffold/decorators/sca-param-id';
import {ScaRemove, ScaRemoveResponse} from '@/scaffold/decorators/sca-remove';
import {ScaUpdate, ScaUpdateResponse} from '@/scaffold/decorators/sca-update';
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
    public async index(): ScaPaginateResponse<ProjectDto> {
        return await this.projects.index();
    }

    @ScaGet(ProjectDto)
    public async get(@ScaParamId() id: number): ScaGetResponse<ProjectDto> {
        return await this.projects.get(id);
    }

    @ScaCreate(ProjectDto)
    public async create(
        @ScaBody(ProjectCreateDto) data: ProjectCreateDto
    ): ScaCreateResponse<ProjectDto> {
        return await this.projects.create(data);
    }

    @ScaUpdate(ProjectDto)
    public async update(
        @ScaParamId() id: number,
        @ScaBody(ProjectUpdateDto) data: ProjectUpdateDto
    ): ScaUpdateResponse<ProjectDto> {
        return await this.projects.update(id, data);
    }

    @ScaRemove(ProjectDto)
    public async remove(@ScaParamId() id: number): ScaRemoveResponse {
        await this.projects.remove(id);
    }
}
