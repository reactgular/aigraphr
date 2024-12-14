import {scaCreateMixin} from '@/scaffold/mixins/sca-create.mixin';
import {scaGetMixin} from '@/scaffold/mixins/sca-get.mixin';
import {scaPaginateMixin} from '@/scaffold/mixins/sca-paginate.mixin';
import {scaRemoveMixin} from '@/scaffold/mixins/sca-remove.mixin';
import {scaUpdateMixin} from '@/scaffold/mixins/sca-update.mixin';
import {ScaConstructor, ScaEmptyBase} from '@/scaffold/mixins/sca.mixin';
import {ScaEntity} from '@/scaffold/models/sca.entity';
import {Type} from '@nestjs/common';

interface ScaCrudMixinOptions<
    TDo extends ScaEntity,
    TCreateDto extends object,
    TUpdateDto extends object
> {
    paramId?: string;
    dto: Type<TDo>;
    createDto: Type<TCreateDto>;
    updateDto: Type<TUpdateDto>;
}

export function scaCrudMixin<
    TDo extends ScaEntity,
    TCreateDto extends object,
    TUpdateDto extends object,
    TBase extends ScaConstructor
>(
    {
        paramId = 'id',
        dto,
        updateDto,
        createDto
    }: ScaCrudMixinOptions<TDo, TCreateDto, TUpdateDto>,
    Base: TBase = ScaEmptyBase as TBase
) {
    return scaPaginateMixin(
        {dto},
        scaGetMixin(
            {paramId, dto},
            scaCreateMixin(
                {
                    dto,
                    createDto
                },
                scaUpdateMixin(
                    {paramId, dto, updateDto},
                    scaRemoveMixin({paramId, dto}, Base)
                )
            )
        )
    );
}
