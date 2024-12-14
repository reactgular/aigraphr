import {ScaCrudService} from '@/scaffold/crud/sca-crud.service';
import {ScaGet, ScaGetResponse} from '@/scaffold/decorators/sca-get';
import {ScaParamId} from '@/scaffold/decorators/sca-param-id';
import {ScaConstructor, ScaEmptyBase} from '@/scaffold/mixins/sca.mixin';
import {ScaEntity} from '@/scaffold/models/sca.entity';
import {Type} from '@nestjs/common';

interface ScaGetMixinOptions<TDo extends ScaEntity> {
    paramId?: string;

    dto: Type<TDo>;
}

export function scaGetMixin<
    TDo extends ScaEntity,
    TBase extends ScaConstructor
>(
    {paramId = 'id', dto}: ScaGetMixinOptions<TDo>,
    Base: TBase = ScaEmptyBase as TBase
) {
    abstract class ScaGetClass extends Base {
        abstract crud(): ScaCrudService<TDo>;

        @ScaGet(dto, paramId)
        async scaGet(@ScaParamId(paramId) id: number): ScaGetResponse<TDo> {
            return await this.crud().scaGet(id);
        }
    }

    return ScaGetClass;
}
