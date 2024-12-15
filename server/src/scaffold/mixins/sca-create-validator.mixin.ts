import {ScaValidatorService} from '@/scaffold/crud/sca-validator.service';
import {ScaBody} from '@/scaffold/decorators/sca-body';
import {
    ScaCreateValidate,
    ScaCreateValidateResponse
} from '@/scaffold/decorators/sca-create-validate';
import {ScaInvalidator} from '@/scaffold/dtos/sca-invalidator';
import {ScaConstructor, ScaEmptyBase} from '@/scaffold/mixins/sca.mixin';
import {ScaEntity} from '@/scaffold/models/sca.entity';
import {Type} from '@nestjs/common';

interface ScaCreateValidatorMixinOptions<TCreateDto extends object> {
    createDto: Type<TCreateDto>;

    decorators?: () => Array<MethodDecorator>;
}

export function scaCreateValidatorMixin<
    TDo extends ScaEntity,
    TCreateDto extends object,
    TBase extends ScaConstructor
>(
    {createDto, decorators}: ScaCreateValidatorMixinOptions<TCreateDto>,
    Base: TBase = ScaEmptyBase as TBase
) {
    abstract class ScaCreateClass extends Base {
        abstract validator(): ScaValidatorService<TDo, TCreateDto, never>;

        @ScaCreateValidate({bodyDto: createDto, decorators})
        async scaCreateValidate(
            @ScaBody(createDto) data: TCreateDto
        ): ScaCreateValidateResponse {
            const invalidator = new ScaInvalidator<TCreateDto>();
            await this.validator().onCreateValidate(invalidator, data);
            return invalidator.response();
        }
    }

    return ScaCreateClass;
}
