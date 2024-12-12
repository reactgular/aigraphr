import {
    ProjectIdDto,
    ProjectIdEntityIdDto
} from '@/projects/_deprecated/project-id-entity-id.dto';
import {
    createCrudController,
    ScaffoldCrudOptions
} from '@/scaffold/_deprecated/create-crud.controller';
import {ScaffoldEntity} from '@/scaffold/_deprecated/scaffold-entity.service';
import {scaffoldValidationPipe} from '@/scaffold/pipes/scaffold-validation.pipe';
import {ApiParam} from '@nestjs/swagger';

/**
 * @deprecated
 */
export function createProjectCrudController<
    TDto extends ScaffoldEntity,
    TEntity extends ScaffoldEntity
>(
    options: Omit<
        ScaffoldCrudOptions<TDto>,
        | 'indexParam'
        | 'getParams'
        | 'createParam'
        | 'deleteParam'
        | 'updateParam'
    >
) {
    return createCrudController<TDto, TEntity>({
        ...options,
        indexParam: {
            method: [
                ApiParam({
                    type: Number,
                    name: 'projectId'
                })
            ],
            param: [scaffoldValidationPipe(ProjectIdDto)]
        },
        getParam: {
            method: [
                ApiParam({
                    type: Number,
                    name: 'id'
                }),
                ApiParam({
                    type: Number,
                    name: 'projectId'
                })
            ],
            param: [scaffoldValidationPipe(ProjectIdEntityIdDto)]
        },
        createParam: {
            method: [
                ApiParam({
                    type: Number,
                    name: 'projectId'
                })
            ],
            param: [scaffoldValidationPipe(ProjectIdDto)]
        },
        deleteParam: {
            method: [
                ApiParam({
                    type: Number,
                    name: 'id'
                }),
                ApiParam({
                    type: Number,
                    name: 'projectId'
                })
            ],
            param: [scaffoldValidationPipe(ProjectIdEntityIdDto)]
        },
        updateParam: {
            method: [
                ApiParam({
                    type: Number,
                    name: 'id'
                }),
                ApiParam({
                    type: Number,
                    name: 'projectId'
                })
            ],
            param: [scaffoldValidationPipe(ProjectIdEntityIdDto)]
        }
    });
}
