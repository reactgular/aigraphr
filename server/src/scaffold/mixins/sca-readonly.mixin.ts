import {scaGetMixin} from '@/scaffold/mixins/sca-get.mixin';
import {scaPaginateMixin} from '@/scaffold/mixins/sca-paginate.mixin';
import {ScaConstructor, ScaEmptyBase} from '@/scaffold/mixins/sca.mixin';
import {ScaEntity} from '@/scaffold/models/sca.entity';
import {Type} from '@nestjs/common';

export type ReadOnlyDecoratorActions = 'paginate' | 'get';

interface ScaReadOnlyMixinOptions<TDo extends ScaEntity> {
    decorators?: (action: ReadOnlyDecoratorActions) => Array<MethodDecorator>;
    dto: Type<TDo>;
    paramId?: string;
}

export function scaReadOnlyMixin<
    TDo extends ScaEntity,
    TBase extends ScaConstructor
>(
    {paramId = 'id', dto, decorators}: ScaReadOnlyMixinOptions<TDo>,
    Base: TBase = ScaEmptyBase as TBase
) {
    return scaPaginateMixin(
        {dto, decorators: () => decorators?.('paginate') ?? []},
        scaGetMixin(
            {paramId, dto, decorators: () => decorators?.('get') ?? []},
            Base
        )
    );
}
