import {ScaBody} from '@/scaffold/decorators/sca-body';
import {ScaCreate, ScaCreateResponse} from '@/scaffold/decorators/sca-create';
import {ScaConstructor, ScaEmptyBase} from '@/scaffold/mixins/sca.mixin';
import {ScaffoldEntity} from '@/scaffold/models/scaffold.entity';
import {Type} from '@nestjs/common';

export function ScaCreateMixin<
    TDo extends ScaffoldEntity,
    TCreateDto extends object,
    TBase extends ScaConstructor
>(
    dto: Type<TDo>,
    createDto: Type<TCreateDto>,
    Base: TBase = ScaEmptyBase as TBase
) {
    class ScaCreateClass extends Base {
        public constructor(...args: any[]) {
            super(...args);
        }

        @ScaCreate(dto)
        public async scaCreate(
            @ScaBody(createDto) data: TCreateDto
        ): ScaCreateResponse<TDo> {
            // return await this.projects.create(data);
            return null as any;
        }
    }

    return ScaCreateClass;
}
