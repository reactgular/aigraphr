import {
    ScaffoldEntity,
    ScaffoldEntityService
} from '@/_deprecated/scaffold-entity.service';
import {ScaffoldGetType} from '@/_deprecated/scaffold-get';
import {ScaffoldIndexType} from '@/_deprecated/scaffold-index';
import {ScaffoldReadDtoService} from '@/_deprecated/scaffold-read-dto.service';

/**
 * @deprecated
 */
export class ScaffoldReadService<
    TEntity extends ScaffoldEntity,
    TGetDto extends ScaffoldEntity
> {
    public constructor(
        public readonly scaffoldEntity: ScaffoldEntityService<TEntity>,
        public readonly scaffoldDto: ScaffoldReadDtoService<TEntity, TGetDto>
    ) {}

    public async index(
        params: ScaffoldIndexType<TGetDto>['Param'],
        query: ScaffoldIndexType<TGetDto>['Query'],
        body: ScaffoldIndexType<TGetDto>['Body']
    ): ScaffoldIndexType<TGetDto>['Response'] {
        const entities = await this.scaffoldEntity.findAll();
        return entities.map(this.scaffoldDto.toGetDto);
    }

    public async get(
        params: ScaffoldGetType<TGetDto>['Param'],
        query: ScaffoldGetType<TGetDto>['Query'],
        body: ScaffoldGetType<TGetDto>['Body']
    ): ScaffoldGetType<TGetDto>['Response'] {
        const entity = await this.scaffoldEntity.findOneOrThrow(params.id);
        return this.scaffoldDto.toGetDto(entity);
    }
}
