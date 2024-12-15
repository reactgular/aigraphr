import {
    ProjectCreateDto,
    ProjectDto,
    ProjectEntity,
    ProjectUpdateDto
} from '@/entities/project.entity';
import {ScaCrudService} from '@/scaffold/crud/sca-crud.service';
import {ScaBody} from '@/scaffold/decorators/sca-body';
import {ScaCreate, ScaCreateResponse} from '@/scaffold/decorators/sca-create';
import {
    ScaCreateValidate,
    ScaCreateValidateResponse
} from '@/scaffold/decorators/sca-create-validate';
import {ScaParamId} from '@/scaffold/decorators/sca-param-id';
import {ScaRemove, ScaRemoveResponse} from '@/scaffold/decorators/sca-remove';
import {ScaUpdate, ScaUpdateResponse} from '@/scaffold/decorators/sca-update';
import {
    ScaUpdateValidate,
    ScaUpdateValidateResponse
} from '@/scaffold/decorators/sca-update-validate';
import {ScaInvalidator} from '@/scaffold/dtos/sca-invalidator';
import {scaReadOnlyMixin} from '@/scaffold/mixins/sca-readonly.mixin';
import {BadRequestException, Controller} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {ProjectsService} from '../services/projects.service';

const paramId = 'projectId';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController extends scaReadOnlyMixin({
    paramId,
    dto: ProjectDto
}) {
    public constructor(private readonly projects: ProjectsService) {
        super();
    }

    public crud(): ScaCrudService<
        ProjectEntity,
        ProjectCreateDto,
        ProjectUpdateDto
    > {
        return this.projects;
    }

    @ScaCreate({bodyDto: ProjectCreateDto, responseDto: ProjectDto})
    public async create(
        @ScaBody(ProjectCreateDto) data: ProjectCreateDto
    ): ScaCreateResponse<ProjectDto> {
        const validator = await this.projects.scaCreateValidate(data);
        if (validator.isValid()) {
            const projectId =
                typeof data.cloneId === 'number'
                    ? await this.projects.clone(data.cloneId, data.name)
                    : await this.projects.create(data.name);
            return await this.projects.scaGet(projectId);
        }
        throw validator.badRequest();
    }

    @ScaCreateValidate({bodyDto: ProjectCreateDto})
    public async createValidate(
        @ScaBody(ProjectCreateDto) data: ProjectCreateDto
    ): ScaCreateValidateResponse {
        const invalidator = new ScaInvalidator<ProjectCreateDto>();
        await this.projects.onCreateValidate(invalidator, data);
        return invalidator.response();
    }

    @ScaUpdate({
        bodyDto: ProjectUpdateDto,
        responseDto: ProjectDto,
        paramId
    })
    public async update(
        @ScaParamId(paramId) id: number,
        @ScaBody(ProjectUpdateDto) data: ProjectUpdateDto
    ): ScaUpdateResponse<ProjectDto> {
        const validator = await this.projects.scaUpdateValidate(id, data);
        if (validator.isValid()) {
            if (data.name && typeof data.open === 'boolean') {
                // TODO: move to scaUpdateValidate
                throw new BadRequestException(
                    'Cannot change name and open status at the same time'
                );
            } else if (data.name) {
                await this.projects.rename(id, data.name);
            } else if (typeof data.open === 'boolean') {
                if (data.open) {
                    await this.projects.open(id);
                } else {
                    await this.projects.close(id);
                }
            } else {
                // TODO: move to scaUpdateValidate
                throw new BadRequestException('No changes provided');
            }
            return this.projects.scaGet(id);
        }
        throw validator.badRequest();
    }

    @ScaUpdateValidate({
        bodyDto: ProjectUpdateDto,
        paramId
    })
    public async updateValidate(
        @ScaParamId(paramId) id: number,
        @ScaBody(ProjectUpdateDto) data: ProjectUpdateDto
    ): ScaUpdateValidateResponse {
        const invalidator = new ScaInvalidator<ProjectUpdateDto>();
        await this.projects.onUpdateValidate(invalidator, id, data);
        return invalidator.response();
    }

    @ScaRemove({dto: ProjectDto, paramId})
    public async remove(@ScaParamId(paramId) id: number): ScaRemoveResponse {
        await this.projects.scaMustExist(id);

        if (await this.projects.isOpened(id)) {
            throw new BadRequestException('Cannot delete an open project');
        }

        await this.projects.remove(id);
    }
}
