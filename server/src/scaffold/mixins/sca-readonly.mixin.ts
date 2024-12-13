import {scaGetMixin} from '@/scaffold/mixins/sca-get.mixin';
import {scaPaginateMixin} from '@/scaffold/mixins/sca-paginate.mixin';
import {ScaConstructor, ScaEmptyBase} from '@/scaffold/mixins/sca.mixin';
import {ScaffoldEntity} from '@/scaffold/models/scaffold.entity';
import {Type} from '@nestjs/common';

export function scaReadOnlyMixin<
    TDo extends ScaffoldEntity,
    TBase extends ScaConstructor
>(dto: Type<TDo>, Base: TBase = ScaEmptyBase as TBase) {
    return scaPaginateMixin(dto, scaGetMixin(dto, Base));
}
