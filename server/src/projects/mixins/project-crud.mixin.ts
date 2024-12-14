import {
    scaCrudMixin,
    ScaCrudMixinOptions
} from '@/scaffold/mixins/sca-crud.mixin';
import {ScaConstructor, ScaEmptyBase} from '@/scaffold/mixins/sca.mixin';
import {ScaEntity} from '@/scaffold/models/sca.entity';
import {ApiParam} from '@nestjs/swagger';

export function projectCrudMixin<
    TDo extends ScaEntity,
    TCreateDto extends object,
    TUpdateDto extends object,
    TBase extends ScaConstructor
>(
    {
        paramId = 'id',
        dto,
        updateDto,
        createDto
    }: Omit<ScaCrudMixinOptions<TDo, TCreateDto, TUpdateDto>, 'decorators'>,
    Base: TBase = ScaEmptyBase as TBase
) {
    return scaCrudMixin(
        {
            paramId,
            dto,
            createDto,
            updateDto,
            decorators: () => [
                ApiParam({
                    name: 'projectId',
                    type: Number,
                    description: 'The ID of a project',
                    required: true
                })
            ]
        },
        Base
    );
}
