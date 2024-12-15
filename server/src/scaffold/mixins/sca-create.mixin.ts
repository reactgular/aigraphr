import {ScaCrudCreate} from '@/scaffold/crud/sca-crud-create';
import {ScaBody} from '@/scaffold/decorators/sca-body';
import {ScaCreate, ScaCreateResponse} from '@/scaffold/decorators/sca-create';
import {ScaConstructor, ScaEmptyBase} from '@/scaffold/mixins/sca.mixin';
import {ScaEntity} from '@/scaffold/models/sca.entity';
import {Type} from '@nestjs/common';
import {DeepPartial} from 'typeorm';

interface ScaCreateMixinOptions<
    TDo extends ScaEntity,
    TCreateDto extends object
> {
    createDto: Type<TCreateDto>;
    decorators?: () => Array<MethodDecorator>;
    dto: Type<TDo>;
}

export function scaCreateMixin<
    TDo extends ScaEntity,
    TCreateDto extends DeepPartial<TDo>,
    TBase extends ScaConstructor
>(
    {dto, createDto, decorators}: ScaCreateMixinOptions<TDo, TCreateDto>,
    Base: TBase = ScaEmptyBase as TBase
) {
    abstract class ScaCreateClass extends Base {
        abstract crud(): ScaCrudCreate<TDo, TCreateDto>;

        @ScaCreate({bodyDto: createDto, responseDto: dto, decorators})
        async scaCreate(
            @ScaBody(createDto) data: TCreateDto
        ): ScaCreateResponse<TDo> {
            return await this.crud().scaCreate(data);
        }
    }

    return ScaCreateClass;
}
