import {ScaCrudService} from '@/scaffold/crud/sca-crud.service';
import {ScaBody} from '@/scaffold/decorators/sca-body';
import {ScaParamId} from '@/scaffold/decorators/sca-param-id';
import {ScaUpdate, ScaUpdateResponse} from '@/scaffold/decorators/sca-update';
import {ScaConstructor, ScaEmptyBase} from '@/scaffold/mixins/sca.mixin';
import {ScaEntity} from '@/scaffold/models/sca.entity';
import {Type} from '@nestjs/common';

interface ScaUpdateMixinOptions<
    TDo extends ScaEntity,
    TUpdateDto extends object
> {
    paramId?: string;
    dto: Type<TDo>;
    updateDto: Type<TUpdateDto>;
}

export function scaUpdateMixin<
    TDo extends ScaEntity,
    TUpdateDto extends object,
    TBase extends ScaConstructor
>(
    {paramId = 'id', dto, updateDto}: ScaUpdateMixinOptions<TDo, TUpdateDto>,
    Base: TBase = ScaEmptyBase as TBase
) {
    abstract class ScaPaginateClass extends Base {
        abstract crud(): ScaCrudService<TDo>;

        @ScaUpdate(updateDto, dto, paramId)
        async scaUpdate(
            @ScaParamId(paramId) id: number,
            @ScaBody(updateDto) data: TUpdateDto
        ): ScaUpdateResponse<TDo> {
            // return await this.projects.update(id, data);
            return null as any;
        }
    }

    return ScaPaginateClass;
}
