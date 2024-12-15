import {scaCreateValidatorMixin} from '@/scaffold/mixins/sca-create-validator.mixin';
import {scaUpdateValidatorMixin} from '@/scaffold/mixins/sca-update-validator.mixin';
import {ScaConstructor, ScaEmptyBase} from '@/scaffold/mixins/sca.mixin';
import {ScaEntity} from '@/scaffold/models/sca.entity';
import {Type} from '@nestjs/common';

export type ValidatorDecoratorActions = 'createValidate' | 'updateValidate';

export interface ScaValidatorMixinOptions<
    TCreateDto extends object,
    TUpdateDto extends object
> {
    paramId?: string;

    createDto: Type<TCreateDto>;

    updateDto: Type<TUpdateDto>;

    decorators?: (action: ValidatorDecoratorActions) => Array<MethodDecorator>;
}

export function scaValidatorMixin<
    TDo extends ScaEntity,
    TCreateDto extends object,
    TUpdateDto extends object,
    TBase extends ScaConstructor
>(
    {
        paramId = 'id',
        updateDto,
        createDto,
        decorators
    }: ScaValidatorMixinOptions<TCreateDto, TUpdateDto>,
    Base: TBase = ScaEmptyBase as TBase
) {
    return scaCreateValidatorMixin(
        {
            createDto,
            decorators: () => decorators?.('createValidate') ?? []
        },
        scaUpdateValidatorMixin(
            {
                paramId,
                updateDto,
                decorators: () => decorators?.('updateValidate') ?? []
            },
            Base
        )
    );
}
