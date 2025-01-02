import {GrNodeDto} from '@/graph/dtos/gr-node.dto';
import {ScaCrudRead} from '@/scaffold/crud/sca-crud-read';
import {ScaGetResponse} from '@/scaffold/decorators/sca-get';
import {ScaPaginateResponse} from '@/scaffold/decorators/sca-paginate';
import {Inject, Injectable, NotFoundException} from '@nestjs/common';

export const CORE_NODES = Symbol('CORE_NODES');

@Injectable()
export class GrNodesService implements ScaCrudRead<GrNodeDto> {
    public constructor(
        @Inject(CORE_NODES) private readonly nodes: GrNodeDto[]
    ) {}

    public async scaGet(id: number): ScaGetResponse<GrNodeDto> {
        const node = this.nodes.find((n) => n.id === id);
        if (!node) {
            throw new NotFoundException(`Node with ID ${id} not found`);
        }
        return node;
    }

    public async scaPaginate(): ScaPaginateResponse<GrNodeDto> {
        return this.nodes;
    }
}
