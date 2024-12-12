import {
    createCrudController,
    ScaffoldCrudOptions
} from '@/scaffold/controllers/create-crud.controller';
import {ScaffoldEmptyDto} from '@/scaffold/dtos/scaffold-empty';
import {ScaffoldEntity} from '@/scaffold/services/scaffold-entity.service';

export function createProjectCrudController<
    TDto extends ScaffoldEntity,
    TEntity extends ScaffoldEntity,
    TParamDto extends ScaffoldEmptyDto
>(options: ScaffoldCrudOptions<TDto, TParamDto>) {
    return createCrudController<TDto, TEntity, TParamDto>(options);
}
