import {GrNodeDto} from '@/graph/dtos/gr-node.dto';
import {ScaCrudRead} from '@/scaffold/crud/sca-crud-read';
import {ScaGetResponse} from '@/scaffold/decorators/sca-get';
import {ScaPaginateResponse} from '@/scaffold/decorators/sca-paginate';
import {Injectable} from '@nestjs/common';

@Injectable()
export class GrNodesService implements ScaCrudRead<GrNodeDto> {
    public constructor() {}

    public async scaGet(id: number): ScaGetResponse<GrNodeDto> {
        return {
            id,
            type: 'forEach',
            inputs: [],
            outputs: []
        } satisfies GrNodeDto;
    }

    public async scaPaginate(): ScaPaginateResponse<GrNodeDto> {
        return [];
    }
}
