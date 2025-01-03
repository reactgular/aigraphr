import {scaValidatorCreateMixin} from '@/scaffold/mixins/sca-validator-create.mixin';
import {scaValidatorUpdateMixin} from '@/scaffold/mixins/sca-validator-update.mixin';
import {ScaConstructor, ScaEmptyBase} from '@/scaffold/mixins/sca.mixin';
import {Type} from '@nestjs/common';

export type ValidatorDecoratorActions = 'validateCreate' | 'validateUpdate';

export interface ScaValidatorMixinOptions<
    TCreateDto extends object,
    TUpdateDto extends object
> {
    createDto: Type<TCreateDto>;
    decorators?: (action: ValidatorDecoratorActions) => Array<MethodDecorator>;
    paramId?: string;
    updateDto: Type<TUpdateDto>;
}

export function scaValidatorMixin<
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
    return scaValidatorCreateMixin(
        {
            createDto,
            decorators: () => decorators?.('validateCreate') ?? []
        },
        scaValidatorUpdateMixin(
            {
                paramId,
                updateDto,
                decorators: () => decorators?.('validateUpdate') ?? []
            },
            Base
        )
    );
}
