import {ScaCrudService} from '@/scaffold/crud/sca-crud.service';
import {ScaGet, ScaGetResponse} from '@/scaffold/decorators/sca-get';
import {ScaParamId} from '@/scaffold/decorators/sca-param-id';
import {ScaConstructor, ScaEmptyBase} from '@/scaffold/mixins/sca.mixin';
import {ScaEntity} from '@/scaffold/models/sca.entity';
import {Type} from '@nestjs/common';

export function scaGetMixin<
    TDo extends ScaEntity,
    TBase extends ScaConstructor
>(dto: Type<TDo>, Base: TBase = ScaEmptyBase as TBase) {
    abstract class ScaGetClass extends Base {
        abstract crud(): ScaCrudService<TDo>;

        @ScaGet(dto)
        async scaGet(@ScaParamId() id: number): ScaGetResponse<TDo> {
            return await this.crud().scaGet(id);
        }
    }

    return ScaGetClass;
}
