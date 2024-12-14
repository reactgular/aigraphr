import {projectCrudMixin} from '@/projects/mixins/project-crud.mixin';
import {ScaCrudMixinOptions} from '@/scaffold/mixins/sca-crud.mixin';
import {ScaConstructor, ScaEmptyBase} from '@/scaffold/mixins/sca.mixin';
import {ScaEntity} from '@/scaffold/models/sca.entity';
import {ApiParam} from '@nestjs/swagger';

export function workspaceCrudMixin<
    TDo extends ScaEntity,
    TCreateDto extends object,
    TUpdateDto extends object,
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
    return projectCrudMixin(
        {
            paramId,
            dto,
            createDto,
            updateDto,
            decorators: (action) => [
                ApiParam({
                    name: 'workspaceId',
                    type: Number,
                    description: 'The ID of a workspace',
                    required: true
                }),
                ...(decorators?.(action) ?? [])
            ]
        },
        Base
    );
}
