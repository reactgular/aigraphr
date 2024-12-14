import {ProController} from '@/projects/decorators/pro-controller';
import {
    NodeCreateDto,
    NodeDto,
    NodeUpdateDto
} from '@/projects/entities/node.entity';
import {NodesService} from '@/projects/services/nodes.service';
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

@ProController('nodes')
export class NodesController {
    public constructor(private readonly nodes: NodesService) {
        //
    }

    @ScaPaginate(NodeDto)
    public async index(): ScaPaginateResponse<NodeDto> {
        return await this.nodes.index();
    }

    @ScaGet(NodeDto)
    public async get(@ScaParamId() id: number): ScaGetResponse<NodeDto> {
        return await this.nodes.get(id);
    }

    @ScaCreate(NodeCreateDto, NodeDto)
    public async create(
        @ScaBody(NodeCreateDto) data: NodeCreateDto
    ): ScaCreateResponse<NodeDto> {
        return await this.nodes.create(data);
    }

    @ScaUpdate(NodeUpdateDto, NodeDto)
    public async update(
        @ScaParamId() id: number,
        @ScaBody(NodeUpdateDto) data: NodeUpdateDto
    ): ScaUpdateResponse<NodeDto> {
        return await this.nodes.update(id, data);
    }

    @ScaRemove(NodeDto)
    public async remove(@ScaParamId() id: number): ScaRemoveResponse {
        return await this.nodes.remove(id);
    }
}
