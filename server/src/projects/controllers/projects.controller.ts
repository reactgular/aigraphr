import {
    ProjectCreateDto,
    ProjectDto,
    ProjectUpdateDto
} from '@/entities/project.entity';
import {ProjectsValidatorService} from '@/projects/services/projects-validator.service';
import {ScaBody} from '@/scaffold/decorators/sca-body';
import {ScaCreate, ScaCreateResponse} from '@/scaffold/decorators/sca-create';
import {ScaParamId} from '@/scaffold/decorators/sca-param-id';
import {ScaRemove, ScaRemoveResponse} from '@/scaffold/decorators/sca-remove';
import {ScaUpdate, ScaUpdateResponse} from '@/scaffold/decorators/sca-update';
import {scaReadOnlyMixin} from '@/scaffold/mixins/sca-readonly.mixin';
import {scaValidatorMixin} from '@/scaffold/mixins/sca-validator.mixin';
import {BadRequestException, Controller} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {ProjectsService} from '../services/projects.service';

const paramId = 'projectId';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController extends scaReadOnlyMixin(
    {
        paramId,
        dto: ProjectDto
    },
    scaValidatorMixin({
        paramId,
        createDto: ProjectCreateDto,
        updateDto: ProjectUpdateDto
    })
) {
    public constructor(
        private readonly projects: ProjectsService,
        private readonly projectsValidator: ProjectsValidatorService
    ) {
        super();
    }

    public crud() {
        return this.projects;
    }

    public validator() {
        return this.projectsValidator;
    }

    @ScaCreate({bodyDto: ProjectCreateDto, responseDto: ProjectDto})
    public async create(
        @ScaBody(ProjectCreateDto) data: ProjectCreateDto
    ): ScaCreateResponse<ProjectDto> {
        const result = await this.projectsValidator.scaCreateValidate(data);
        if (result.isValid()) {
            const projectId =
                typeof data.cloneId === 'number'
                    ? await this.projects.clone(data.cloneId, data.name)
                    : await this.projects.create(data.name);
            return await this.projects.scaGet(projectId);
        }
        throw result.exception();
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
        const result = await this.projectsValidator.scaUpdateValidate(id, data);
        if (result.isValid()) {
            if (data.name) {
                await this.projects.rename(id, data.name);
            } else if (typeof data.open === 'boolean') {
                if (data.open) {
                    await this.projects.open(id);
                } else {
                    await this.projects.close(id);
                }
            }
            return this.projects.scaGet(id);
        }
        throw result.exception();
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
