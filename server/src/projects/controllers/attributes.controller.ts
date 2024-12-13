import {ProController} from '@/projects/decorators/pro-controller';
import {
    AttributeCreateDto,
    AttributeDto,
    AttributeUpdateDto
} from '@/projects/entities/attribute.entity';
import {AttributesService} from '@/projects/services/attributes.service';
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

@ProController('attributes')
export class AttributesController {
    public constructor(private readonly attributes: AttributesService) {
        //
    }

    @ScaPaginate(AttributeDto)
    public async index(): ScaPaginateResponse<AttributeDto> {
        return await this.attributes.index();
    }

    @ScaGet(AttributeDto)
    public async get(@ScaParamId() id: number): ScaGetResponse<AttributeDto> {
        return await this.attributes.get(id);
    }

    @ScaCreate(AttributeDto)
    public async create(
        @ScaBody(AttributeCreateDto) data: AttributeCreateDto
    ): ScaCreateResponse<AttributeDto> {
        return await this.attributes.create(data);
    }

    @ScaUpdate(AttributeDto)
    public async update(
        @ScaParamId() id: number,
        @ScaBody(AttributeUpdateDto) data: AttributeUpdateDto
    ): ScaUpdateResponse<AttributeDto> {
        return await this.attributes.update(id, data);
    }

    @ScaRemove(AttributeDto)
    public async remove(@ScaParamId() id: number): ScaRemoveResponse {
        await this.attributes.remove(id);
    }
}
