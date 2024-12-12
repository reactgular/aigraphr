import {ScaffoldEntity} from '@/scaffold/services/scaffold-entity.service';

export interface ScaffoldReadDtoService<
    TEntity extends ScaffoldEntity,
    TGetDto extends ScaffoldEntity
> {
    toGetDto(entity: TEntity): TGetDto;
}
