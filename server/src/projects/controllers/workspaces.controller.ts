import {ProController} from '@/projects/decorators/pro-controller';
import {NodeDto} from '@/projects/entities/node.entity';
import {
    WorkspaceCreateDto,
    WorkspaceDto,
    WorkspaceUpdateDto
} from '@/projects/entities/workspace.entity';
import {WorkspacesService} from '@/projects/services/workspaces.service';
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
import {Body} from '@nestjs/common';

@ProController('workspaces')
export class WorkspacesController {
    public constructor(private readonly workspaces: WorkspacesService) {
        //
    }

    @ScaPaginate(WorkspaceDto)
    public async index(): ScaPaginateResponse<WorkspaceDto> {
        return await this.workspaces.index();
    }

    @ScaGet(WorkspaceDto)
    public async get(@ScaParamId() id: number): ScaGetResponse<WorkspaceDto> {
        return await this.workspaces.get(id);
    }

    @ScaCreate(WorkspaceDto)
    public async create(
        @Body() data: WorkspaceCreateDto
    ): ScaCreateResponse<WorkspaceDto> {
        return await this.workspaces.create(data);
    }

    @ScaUpdate(WorkspaceDto)
    public async update(
        @ScaParamId() id: number,
        @ScaBody(WorkspaceUpdateDto) data: WorkspaceUpdateDto
    ): ScaUpdateResponse<WorkspaceDto> {
        return await this.workspaces.update(id, data);
    }

    @ScaRemove(NodeDto)
    public async remove(@ScaParamId() id: number): ScaRemoveResponse {
        return await this.workspaces.remove(id);
    }
}
