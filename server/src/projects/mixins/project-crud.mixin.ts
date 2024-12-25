import {
    scaCrudMixin,
    ScaCrudMixinOptions
} from '@/scaffold/mixins/sca-crud.mixin';
import {ScaConstructor, ScaEmptyBase} from '@/scaffold/mixins/sca.mixin';
import {ScaEntity} from '@/scaffold/models/sca.entity';
import {ApiParam} from '@nestjs/swagger';
import {DeepPartial} from 'typeorm';

export function projectCrudMixin<
    TDo extends ScaEntity,
    TCreateDto extends DeepPartial<TDo>,
    TUpdateDto extends DeepPartial<TDo>,
    TBase extends ScaConstructor
>(
    {
        paramId = 'id',
        dto,
        updateDto,
        createDto,
        decorators
    }: ScaCrudMixinOptions<TDo, TCreateDto, TUpdateDto>,
    Base: TBase = ScaEmptyBase as TBase
) {
    return scaCrudMixin(
        {
            paramId,
            dto,
            createDto,
            updateDto,
            decorators: (action) => [
                ApiParam({
                    name: 'projectId',
                    type: Number,
                    description: 'The ID of a project',
                    required: true
                }),
                ...(decorators?.(action) ?? [])
            ]
        },
        Base
    );
}
