import {
    createCrudController,
    ScaffoldCrudOptions
} from '@/_deprecated/create-crud.controller';
import {
    ProjectIdDto,
    ProjectIdEntityIdDto
} from '@/_deprecated/project-id-entity-id.dto';
import {ScaffoldEntity} from '@/_deprecated/scaffold-entity.service';
import {scaValidationPipe} from '@/scaffold/pipes/sca-validation.pipe';
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
            param: [scaValidationPipe(ProjectIdDto)]
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
            param: [scaValidationPipe(ProjectIdEntityIdDto)]
        },
        createParam: {
            method: [
                ApiParam({
                    type: Number,
                    name: 'projectId'
                })
            ],
            param: [scaValidationPipe(ProjectIdDto)]
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
            param: [scaValidationPipe(ProjectIdEntityIdDto)]
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
            param: [scaValidationPipe(ProjectIdEntityIdDto)]
        }
    });
}
