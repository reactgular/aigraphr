import {ScaffoldEntity} from '@/scaffold/_deprecated/scaffold-entity.service';
import {ScaffoldReadDtoService} from '@/scaffold/_deprecated/scaffold-read-dto.service';

/**
 * This interface bothers me, it seems like a entity transformer but it is
 * really just a hack to get around typing. All these types are the same
 * underlying DTOs, but they are typed differently because of the way the
 * decorators are set up.
 *
 * @deprecated
 */
export interface ScaffoldCrudDtoService<
    TEntity extends ScaffoldEntity,
    TGetDto extends ScaffoldEntity,
    TCreateDto extends Partial<ScaffoldEntity>,
    TUpdateDto extends Partial<ScaffoldEntity>
> extends ScaffoldReadDtoService<TEntity, TGetDto> {
    /**
     * @todo should return a type that omits ID
     */
    fromCreateDto(create: TCreateDto): Partial<TEntity>;

    /**
     * @todo should return a type that omits ID
     */
    fromUpdateDto(update: TUpdateDto): Partial<TEntity>;
}
