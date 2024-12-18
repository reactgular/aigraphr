import {ScaBody} from '@/scaffold/decorators/sca-body';
import {
    ScaCreateValidate,
    ScaCreateValidateResponse
} from '@/scaffold/decorators/sca-create-validate';
import {ScaConstructor, ScaEmptyBase} from '@/scaffold/mixins/sca.mixin';
import {ScaInvalidatorBuilder} from '@/scaffold/validators/sca-invalidator-builder';
import {ScaValidatorHandler} from '@/scaffold/validators/sca-validator-handler';
import {Type} from '@nestjs/common';

interface ScaValidatorCreateMixinOptions<TCreateDto extends object> {
    createDto: Type<TCreateDto>;

    decorators?: () => Array<MethodDecorator>;
}

export function scaValidatorCreateMixin<
    TCreateDto extends object,
    TBase extends ScaConstructor
>(
    {createDto, decorators}: ScaValidatorCreateMixinOptions<TCreateDto>,
    Base: TBase = ScaEmptyBase as TBase
) {
    abstract class ScaCreateClass extends Base {
        @ScaCreateValidate({bodyDto: createDto, decorators})
        async createValidate(
            @ScaBody(createDto) data: TCreateDto
        ): ScaCreateValidateResponse {
            const builder = new ScaInvalidatorBuilder<TCreateDto>();
            await this.validator().onCreateValidate(builder, data);
            return builder.result().response();
        }

        abstract validator(): ScaValidatorHandler<TCreateDto, never>;
    }

    return ScaCreateClass;
}
