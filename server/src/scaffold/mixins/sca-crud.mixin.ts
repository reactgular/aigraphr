import {scaCreateMixin} from '@/scaffold/mixins/sca-create.mixin';
import {
    ReadOnlyDecoratorActions,
    scaReadOnlyMixin
} from '@/scaffold/mixins/sca-readonly.mixin';
import {scaRemoveMixin} from '@/scaffold/mixins/sca-remove.mixin';
import {scaUpdateMixin} from '@/scaffold/mixins/sca-update.mixin';
import {ScaConstructor, ScaEmptyBase} from '@/scaffold/mixins/sca.mixin';
import {ScaEntity} from '@/scaffold/models/sca.entity';
import {Type} from '@nestjs/common';

export type CrudDecoratorActions =
    | 'create'
    | 'update'
    | 'remove'
    | ReadOnlyDecoratorActions;

export interface ScaCrudMixinOptions<
    TDo extends ScaEntity,
    TCreateDto extends object,
    TUpdateDto extends object
> {
    paramId?: string;

    dto: Type<TDo>;

    createDto: Type<TCreateDto>;

    updateDto: Type<TUpdateDto>;

    decorators?: (action: CrudDecoratorActions) => Array<MethodDecorator>;
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
        createDto,
        decorators
    }: ScaCrudMixinOptions<TDo, TCreateDto, TUpdateDto>,
    Base: TBase = ScaEmptyBase as TBase
) {
    return scaCreateMixin(
        {
            dto,
            createDto,
            decorators: () => decorators?.('create') ?? []
        },
        scaUpdateMixin(
            {
                paramId,
                dto,
                updateDto,
                decorators: () => decorators?.('update') ?? []
            },
            scaRemoveMixin(
                {
                    paramId,
                    dto,
                    decorators: () => decorators?.('remove') ?? []
                },
                scaReadOnlyMixin(
                    {
                        paramId,
                        dto,
                        decorators: (action) => decorators?.(action) ?? []
                    },
                    Base
                )
            )
        )
    );
}
