import {ScaffoldEntity} from '@/scaffold/services/scaffold-entity.service';

export interface ScaffoldDtoService<
    TEntity extends ScaffoldEntity,
    TGetDto extends ScaffoldEntity,
    TCreateDto,
    TUpdateDto
> {
    toGetDto(entity: TEntity): TGetDto;

    toCreateDto(entity: TEntity): TCreateDto;

    toUpdateDto(entity: TEntity): TUpdateDto;
}
