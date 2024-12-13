import {ScaBody} from '@/scaffold/decorators/sca-body';
import {ScaParamId} from '@/scaffold/decorators/sca-param-id';
import {ScaUpdate, ScaUpdateResponse} from '@/scaffold/decorators/sca-update';
import {ScaConstructor, ScaEmptyBase} from '@/scaffold/mixins/sca.mixin';
import {ScaffoldEntity} from '@/scaffold/models/scaffold.entity';
import {Type} from '@nestjs/common';

export function ScaUpdateMixin<
    TDo extends ScaffoldEntity,
    TUpdateDto extends object,
    TBase extends ScaConstructor
>(
    dto: Type<TDo>,
    updateDto: Type<TUpdateDto>,
    Base: TBase = ScaEmptyBase as TBase
) {
    class ScaPaginateClass extends Base {
        public constructor(...args: any[]) {
            super(...args);
        }

        @ScaUpdate(dto)
        public async scaUpdate(
            @ScaParamId() id: number,
            @ScaBody(updateDto) data: TUpdateDto
        ): ScaUpdateResponse<TDo> {
            // return await this.projects.update(id, data);
            return null as any;
        }
    }

    return ScaPaginateClass;
}
