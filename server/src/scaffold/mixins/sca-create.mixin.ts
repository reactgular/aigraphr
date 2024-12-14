import {ScaCrudService} from '@/scaffold/crud/sca-crud.service';
import {ScaBody} from '@/scaffold/decorators/sca-body';
import {ScaCreate, ScaCreateResponse} from '@/scaffold/decorators/sca-create';
import {ScaConstructor, ScaEmptyBase} from '@/scaffold/mixins/sca.mixin';
import {ScaEntity} from '@/scaffold/models/sca.entity';
import {Type} from '@nestjs/common';

export function scaCreateMixin<
    TDo extends ScaEntity,
    TCreateDto extends object,
    TBase extends ScaConstructor
>(
    dto: Type<TDo>,
    createDto: Type<TCreateDto>,
    Base: TBase = ScaEmptyBase as TBase
) {
    abstract class ScaCreateClass extends Base {
        abstract crud(): ScaCrudService<TDo>;

        @ScaCreate(createDto, dto)
        async scaCreate(
            @ScaBody(createDto) data: TCreateDto
        ): ScaCreateResponse<TDo> {
            // return await this.projects.create(data);
            return null as any;
        }
    }

    return ScaCreateClass;
}
