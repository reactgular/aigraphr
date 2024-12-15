import {ScaCrudUpdate} from '@/scaffold/crud/sca-crud-update';
import {ScaBody} from '@/scaffold/decorators/sca-body';
import {ScaParamId} from '@/scaffold/decorators/sca-param-id';
import {ScaUpdate, ScaUpdateResponse} from '@/scaffold/decorators/sca-update';
import {ScaConstructor, ScaEmptyBase} from '@/scaffold/mixins/sca.mixin';
import {ScaEntity} from '@/scaffold/models/sca.entity';
import {Type} from '@nestjs/common';
import {DeepPartial} from 'typeorm';

interface ScaUpdateMixinOptions<
    TDo extends ScaEntity,
    TUpdateDto extends object
> {
    decorators?: () => Array<MethodDecorator>;
    dto: Type<TDo>;
    paramId?: string;
    updateDto: Type<TUpdateDto>;
}

export function scaUpdateMixin<
    TDo extends ScaEntity,
    TUpdateDto extends DeepPartial<TDo>,
    TBase extends ScaConstructor
>(
    {
        paramId = 'id',
        dto,
        updateDto,
        decorators
    }: ScaUpdateMixinOptions<TDo, TUpdateDto>,
    Base: TBase = ScaEmptyBase as TBase
) {
    abstract class ScaPaginateClass extends Base {
        abstract crud(): ScaCrudUpdate<TDo, TUpdateDto>;

        @ScaUpdate({bodyDto: updateDto, responseDto: dto, paramId, decorators})
        async scaUpdate(
            @ScaParamId(paramId) id: number,
            @ScaBody(updateDto) data: TUpdateDto
        ): ScaUpdateResponse<TDo> {
            return await this.crud().scaUpdate(id, data);
        }
    }

    return ScaPaginateClass;
}
