import {ScaCrudRead} from '@/scaffold/crud/sca-crud-read';
import {ScaGet, ScaGetResponse} from '@/scaffold/decorators/sca-get';
import {ScaParamId} from '@/scaffold/decorators/sca-param-id';
import {ScaConstructor, ScaEmptyBase} from '@/scaffold/mixins/sca.mixin';
import {ScaEntity} from '@/scaffold/models/sca.entity';
import {Type} from '@nestjs/common';

interface ScaGetMixinOptions<TDo extends ScaEntity> {
    decorators?: () => Array<MethodDecorator>;

    dto: Type<TDo>;

    paramId?: string;
}

export function scaGetMixin<
    TDo extends ScaEntity,
    TBase extends ScaConstructor
>(
    {paramId = 'id', dto, decorators}: ScaGetMixinOptions<TDo>,
    Base: TBase = ScaEmptyBase as TBase
) {
    abstract class ScaGetClass extends Base {
        abstract crud(): ScaCrudRead<TDo>;

        @ScaGet({dto, paramId, decorators})
        async get(@ScaParamId(paramId) id: number): ScaGetResponse<TDo> {
            return await this.crud().scaGet(id);
        }
    }

    return ScaGetClass;
}
