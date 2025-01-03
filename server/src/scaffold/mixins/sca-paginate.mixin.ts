import {ScaCrudRead} from '@/scaffold/crud/sca-crud-read';
import {
    ScaPaginate,
    ScaPaginateResponse
} from '@/scaffold/decorators/sca-paginate';
import {ScaConstructor, ScaEmptyBase} from '@/scaffold/mixins/sca.mixin';
import {ScaEntity} from '@/scaffold/models/sca.entity';
import {Logger, Type} from '@nestjs/common';

interface ScaPaginateMixinOptions<TDo extends ScaEntity> {
    decorators?: () => Array<MethodDecorator>;

    dto: Type<TDo>;
}

export function scaPaginateMixin<
    TDo extends ScaEntity,
    TBase extends ScaConstructor
>(
    {dto, decorators}: ScaPaginateMixinOptions<TDo>,
    Base: TBase = ScaEmptyBase as TBase
) {
    abstract class ScaPaginateClass extends Base {
        abstract crud(): ScaCrudRead<TDo>;

        @ScaPaginate({dto, decorators})
        async paginate(): ScaPaginateResponse<TDo> {
            Logger.log('Paginate', 'ScaPaginateMixin');
            return await this.crud().scaPaginate();
        }
    }

    return ScaPaginateClass;
}
