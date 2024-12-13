import {ScaffoldEntity} from '@/_deprecated/scaffold-entity.service';

/**
 * @deprecated
 */
export interface ScaffoldReadDtoService<
    TEntity extends ScaffoldEntity,
    TGetDto extends ScaffoldEntity
> {
    toGetDto(entity: TEntity): TGetDto;
}
