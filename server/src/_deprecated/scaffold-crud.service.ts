import {ScaffoldCreateType} from '@/_deprecated/scaffold-create';
import {ScaffoldCrudDtoService} from '@/_deprecated/scaffold-crud-dto.service';
import {ScaffoldDeleteType} from '@/_deprecated/scaffold-delete';
import {
    ScaffoldEntity,
    ScaffoldEntityService
} from '@/_deprecated/scaffold-entity.service';
import {ScaffoldGetType} from '@/_deprecated/scaffold-get';
import {ScaffoldIndexType} from '@/_deprecated/scaffold-index';
import {ScaffoldUpdateType} from '@/_deprecated/scaffold-update';

/**
 * @deprecated
 */
export class ScaffoldCrudService<
    TEntity extends ScaffoldEntity,
    TGetDto extends ScaffoldEntity,
    TCreateDto extends Partial<ScaffoldEntity>,
    TUpdateDto extends Partial<ScaffoldEntity>
> {
    public constructor(
        public readonly scaffoldEntity: ScaffoldEntityService<TEntity>,
        public readonly scaffoldDto: ScaffoldCrudDtoService<
            TEntity,
            TGetDto,
            TCreateDto,
            TUpdateDto
        >
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

    public async create(
        params: ScaffoldCreateType<TCreateDto, TGetDto>['Param'],
        query: ScaffoldCreateType<TCreateDto, TGetDto>['Query'],
        body: ScaffoldCreateType<TCreateDto, TGetDto>['Body']
    ): ScaffoldCreateType<TCreateDto, TGetDto>['Response'] {
        const entity = await this.scaffoldEntity.create(
            this.scaffoldDto.fromCreateDto(body)
        );
        return this.scaffoldDto.toGetDto(entity);
    }

    public async update(
        params: ScaffoldUpdateType<TUpdateDto, TGetDto>['Param'],
        query: ScaffoldUpdateType<TUpdateDto, TGetDto>['Query'],
        body: ScaffoldUpdateType<TUpdateDto, TGetDto>['Body']
    ): ScaffoldUpdateType<TUpdateDto, TGetDto>['Response'] {
        await this.scaffoldEntity.update(params.id, body as any);
        return this.scaffoldDto.toGetDto(
            await this.scaffoldEntity.findOneOrThrow(params.id)
        );
    }

    public async remove(
        params: ScaffoldDeleteType['Param'],
        query: ScaffoldDeleteType['Query'],
        body: ScaffoldDeleteType['Body']
    ): ScaffoldDeleteType['Response'] {
        await this.scaffoldEntity.remove(params.id);
    }
}
