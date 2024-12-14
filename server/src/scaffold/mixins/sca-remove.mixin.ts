import {ScaCrudService} from '@/scaffold/crud/sca-crud.service';
import {ScaParamId} from '@/scaffold/decorators/sca-param-id';
import {ScaRemove, ScaRemoveResponse} from '@/scaffold/decorators/sca-remove';
import {ScaConstructor, ScaEmptyBase} from '@/scaffold/mixins/sca.mixin';
import {ScaEntity} from '@/scaffold/models/sca.entity';
import {Type} from '@nestjs/common';

interface ScaRemoveMixinOptions<TDo extends ScaEntity> {
    paramId?: string;

    dto: Type<TDo>;

    decorators?: () => Array<MethodDecorator>;
}

export function scaRemoveMixin<
    TDo extends ScaEntity,
    TBase extends ScaConstructor
>(
    {paramId = 'id', dto, decorators}: ScaRemoveMixinOptions<TDo>,
    Base: TBase = ScaEmptyBase as TBase
) {
    abstract class ScaRemoveClass extends Base {
        abstract crud(): ScaCrudService<TDo>;

        @ScaRemove({dto, paramId, decorators})
        async scaRemove(@ScaParamId(paramId) id: number): ScaRemoveResponse {
            // await this.projects.remove(id);
        }
    }

    return ScaRemoveClass;
}
