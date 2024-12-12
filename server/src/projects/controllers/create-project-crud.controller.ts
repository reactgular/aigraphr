import {ProjectIdDto} from '@/projects/dtos/project-id.dto';
import {
    createCrudController,
    ScaffoldCrudOptions
} from '@/scaffold/controllers/create-crud.controller';
import {ScaffoldEntity} from '@/scaffold/services/scaffold-entity.service';

export function createProjectCrudController<
    TDto extends ScaffoldEntity,
    TEntity extends ScaffoldEntity
>(options: Omit<ScaffoldCrudOptions<TDto, ProjectIdDto>, 'getParams'>) {
    return createCrudController<TDto, TEntity, ProjectIdDto>({
        ...options,
        getParams: {
            params: [
                {
                    name: 'id',
                    type: Number,
                    required: true
                },
                {
                    name: 'projectId',
                    type: Number,
                    required: true
                }
            ],
            dto: ProjectIdDto
        }
    });
}
