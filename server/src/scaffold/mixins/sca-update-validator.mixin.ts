import {ProjectUpdateDto} from '@/entities/project.entity';
import {ScaValidatorService} from '@/scaffold/crud/sca-validator.service';
import {ScaBody} from '@/scaffold/decorators/sca-body';
import {ScaParamId} from '@/scaffold/decorators/sca-param-id';
import {
    ScaUpdateValidate,
    ScaUpdateValidateResponse
} from '@/scaffold/decorators/sca-update-validate';
import {ScaInvalidator} from '@/scaffold/dtos/sca-invalidator';
import {ScaConstructor, ScaEmptyBase} from '@/scaffold/mixins/sca.mixin';
import {ScaEntity} from '@/scaffold/models/sca.entity';
import {Type} from '@nestjs/common';

interface ScaUpdateValidatorMixinOptions<TUpdateDto extends object> {
    paramId?: string;

    updateDto: Type<TUpdateDto>;

    decorators?: () => Array<MethodDecorator>;
}

export function scaUpdateValidatorMixin<
    TDo extends ScaEntity,
    TUpdateDto extends object,
    TBase extends ScaConstructor
>(
    {
        paramId = 'id',
        updateDto,
        decorators
    }: ScaUpdateValidatorMixinOptions<TUpdateDto>,
    Base: TBase = ScaEmptyBase as TBase
) {
    abstract class ScaPaginateClass extends Base {
        abstract validator(): ScaValidatorService<TDo, never, TUpdateDto>;

        @ScaUpdateValidate({bodyDto: updateDto, paramId, decorators})
        async scaUpdateValidate(
            @ScaParamId(paramId) id: number,
            @ScaBody(updateDto) data: TUpdateDto
        ): ScaUpdateValidateResponse {
            const invalidator = new ScaInvalidator<ProjectUpdateDto>();
            await this.validator().onUpdateValidate(invalidator, id, data);
            return invalidator.response();
        }
    }

    return ScaPaginateClass;
}
