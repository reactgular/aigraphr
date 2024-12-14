import {ProController} from '@/projects/decorators/pro-controller';
import {
    EdgeCreateDto,
    EdgeDto,
    EdgeUpdateDto
} from '@/projects/entities/edge.entity';
import {NodeDto} from '@/projects/entities/node.entity';
import {EdgesService} from '@/projects/services/edges.service';
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

@ProController('edges')
export class EdgesController {
    public constructor(private readonly edges: EdgesService) {
        //
    }

    @ScaPaginate(EdgeDto)
    public async index(): ScaPaginateResponse<EdgeDto> {
        return await this.edges.index();
    }

    @ScaGet(EdgeDto)
    public async get(@ScaParamId() id: number): ScaGetResponse<EdgeDto> {
        return await this.edges.get(id);
    }

    @ScaCreate(EdgeCreateDto, EdgeDto)
    public async create(
        @ScaBody(EdgeCreateDto) data: EdgeCreateDto
    ): ScaCreateResponse<EdgeDto> {
        return await this.edges.create(data);
    }

    @ScaUpdate(EdgeUpdateDto, EdgeDto)
    public async update(
        @ScaParamId() id: number,
        @ScaBody(EdgeUpdateDto) data: EdgeUpdateDto
    ): ScaUpdateResponse<NodeDto> {
        return await this.edges.update(id, data);
    }

    @ScaRemove(EdgeDto)
    public async remove(@ScaParamId() id: number): ScaRemoveResponse {
        return await this.edges.remove(id);
    }
}
