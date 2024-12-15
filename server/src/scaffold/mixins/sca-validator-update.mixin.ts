import {ScaBody} from '@/scaffold/decorators/sca-body';
import {ScaParamId} from '@/scaffold/decorators/sca-param-id';
import {
    ScaUpdateValidate,
    ScaUpdateValidateResponse
} from '@/scaffold/decorators/sca-update-validate';
import {ScaConstructor, ScaEmptyBase} from '@/scaffold/mixins/sca.mixin';
import {ScaInvalidatorBuilder} from '@/scaffold/validators/sca-invalidator-builder';
import {ScaValidatorHandler} from '@/scaffold/validators/sca-validator-handler';
import {Type} from '@nestjs/common';

interface ScaValidatorUpdateMixinOptions<TUpdateDto extends object> {
    paramId?: string;

    updateDto: Type<TUpdateDto>;

    decorators?: () => Array<MethodDecorator>;
}

export function scaValidatorUpdateMixin<
    TUpdateDto extends object,
    TBase extends ScaConstructor
>(
    {
        paramId = 'id',
        updateDto,
        decorators
    }: ScaValidatorUpdateMixinOptions<TUpdateDto>,
    Base: TBase = ScaEmptyBase as TBase
) {
    abstract class ScaPaginateClass extends Base {
        abstract validator(): ScaValidatorHandler<never, TUpdateDto>;

        @ScaUpdateValidate({bodyDto: updateDto, paramId, decorators})
        async scaUpdateValidate(
            @ScaParamId(paramId) id: number,
            @ScaBody(updateDto) data: TUpdateDto
        ): ScaUpdateValidateResponse {
            const builder = new ScaInvalidatorBuilder<TUpdateDto>();
            await this.validator().onUpdateValidate(builder, id, data);
            return builder.result().response();
        }
    }

    return ScaPaginateClass;
}
