import {scaCreateMixin} from '@/scaffold/mixins/sca-create.mixin';
import {scaGetMixin} from '@/scaffold/mixins/sca-get.mixin';
import {scaPaginateMixin} from '@/scaffold/mixins/sca-paginate.mixin';
import {scaRemoveMixin} from '@/scaffold/mixins/sca-remove.mixin';
import {scaUpdateMixin} from '@/scaffold/mixins/sca-update.mixin';
import {ScaConstructor, ScaEmptyBase} from '@/scaffold/mixins/sca.mixin';
import {ScaEntity} from '@/scaffold/models/sca.entity';
import {Type} from '@nestjs/common';

export function scaCrudMixin<
    TDo extends ScaEntity,
    TCreateDto extends object,
    TUpdateDto extends object,
    TBase extends ScaConstructor
>(
    dto: Type<TDo>,
    createDto: Type<TCreateDto>,
    updateDto: Type<TUpdateDto>,
    Base: TBase = ScaEmptyBase as TBase
) {
    return scaPaginateMixin(
        dto,
        scaGetMixin(
            dto,
            scaCreateMixin(
                dto,
                createDto,
                scaUpdateMixin(dto, updateDto, scaRemoveMixin(dto, Base))
            )
        )
    );
}
