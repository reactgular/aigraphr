import {ScaCrudRemove} from '@/scaffold/crud/sca-crud-remove';
import {ScaParamId} from '@/scaffold/decorators/sca-param-id';
import {ScaRemove, ScaRemoveResponse} from '@/scaffold/decorators/sca-remove';
import {ScaConstructor, ScaEmptyBase} from '@/scaffold/mixins/sca.mixin';
import {ScaEntity} from '@/scaffold/models/sca.entity';
import {Type} from '@nestjs/common';

interface ScaRemoveMixinOptions<TDo extends ScaEntity> {
    decorators?: () => Array<MethodDecorator>;
    dto: Type<TDo>;
    paramId?: string;
}

export function scaRemoveMixin<
    TDo extends ScaEntity,
    TBase extends ScaConstructor
>(
    {paramId = 'id', dto, decorators}: ScaRemoveMixinOptions<TDo>,
    Base: TBase = ScaEmptyBase as TBase
) {
    abstract class ScaRemoveClass extends Base {
        abstract crud(): ScaCrudRemove;

        @ScaRemove({dto, paramId, decorators})
        async scaRemove(@ScaParamId(paramId) id: number): ScaRemoveResponse {
            await this.crud().scaRemove(id);
        }
    }

    return ScaRemoveClass;
}
