import {ScaCrudService} from '@/scaffold/crud/sca-crud.service';
import {ScaBody} from '@/scaffold/decorators/sca-body';
import {ScaCreate, ScaCreateResponse} from '@/scaffold/decorators/sca-create';
import {ScaConstructor, ScaEmptyBase} from '@/scaffold/mixins/sca.mixin';
import {ScaEntity} from '@/scaffold/models/sca.entity';
import {Type} from '@nestjs/common';

interface ScaCreateMixinOptions<
    TDo extends ScaEntity,
    TCreateDto extends object
> {
    dto: Type<TDo>;

    createDto: Type<TCreateDto>;

    decorators?: () => Array<MethodDecorator>;
}

export function scaCreateMixin<
    TDo extends ScaEntity,
    TCreateDto extends object,
    TBase extends ScaConstructor
>(
    {dto, createDto, decorators}: ScaCreateMixinOptions<TDo, TCreateDto>,
    Base: TBase = ScaEmptyBase as TBase
) {
    abstract class ScaCreateClass extends Base {
        abstract crud(): ScaCrudService<TDo>;

        @ScaCreate({bodyDto: createDto, responseDto: dto, decorators})
        async scaCreate(
            @ScaBody(createDto) data: TCreateDto
        ): ScaCreateResponse<TDo> {
            // return await this.projects.create(data);
            return null as any;
        }
    }

    return ScaCreateClass;
}
