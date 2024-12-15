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

    public crud(): ScaCrudService<ProjectEntity> {
        return this.projects;
    }

    @ScaCreate({bodyDto: ProjectCreateDto, responseDto: ProjectDto})
    public async create(
        @ScaBody(ProjectCreateDto) data: ProjectCreateDto
    ): ScaCreateResponse<ProjectDto> {
        if (typeof data.cloneId === 'number') {
            await this.projects.scaMustExist(data.cloneId);
        }

        const projectId =
            typeof data.cloneId === 'number'
                ? await this.projects.clone(data.cloneId, data.name)
                : await this.projects.create(data.name);

        return await this.projects.scaGet(projectId);
    }

    @ScaCreateValidate({bodyDto: ProjectCreateDto})
    public async createValidate(
        @ScaBody(ProjectCreateDto) data: ProjectCreateDto
    ): ScaCreateValidateResponse {
        const invalidator = new ScaInvalidator();

        if (typeof data.cloneId === 'number') {
            if (!(await this.projects.scaExists(data.cloneId))) {
                invalidator.notFound('cloneId', 'Project does not exist');
            }
        }

        if (await this.projects.existsByName(data.name)) {
            invalidator.notUnique(
                'name',
                'Project with the same name already exists'
            );
        }

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
        await this.projects.scaMustExist(id);

        if (data.name && typeof data.open === 'boolean') {
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
            throw new BadRequestException('No changes provided');
        }

        return this.projects.scaGet(id);
    }

    @ScaUpdateValidate({
        bodyDto: ProjectUpdateDto,
        paramId
    })
    public async updateValidate(
        @ScaParamId(paramId) id: number,
        @ScaBody(ProjectUpdateDto) data: ProjectUpdateDto
    ): ScaUpdateValidateResponse {
        const project = await this.projects.scaGet(id);

        const invalidator = new ScaInvalidator();

        if (data.name && data.name !== project.name) {
            if (data.name.length < 3) {
                invalidator.invalid(
                    'name',
                    'Name must be at least 3 characters long'
                );
            } else if (await this.projects.existsByName(data.name)) {
                invalidator.notUnique(
                    'name',
                    'Project with the same name already exists'
                );
            }
        }

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
