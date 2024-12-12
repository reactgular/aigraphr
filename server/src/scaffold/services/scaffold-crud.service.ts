import {ScaffoldCreateType} from '@/scaffold/decorators/scaffold-create';
import {ScaffoldDeleteType} from '@/scaffold/decorators/scaffold-delete';
import {ScaffoldGetType} from '@/scaffold/decorators/scaffold-get';
import {ScaffoldIndexType} from '@/scaffold/decorators/scaffold-index';
import {ScaffoldDtoService} from '@/scaffold/services/scaffold-dto.service';
import {
    ScaffoldEntity,
    ScaffoldEntityService
} from '@/scaffold/services/scaffold-entity.service';

export class ScaffoldCrudService<
    TEntity extends ScaffoldEntity,
    TGetDto extends ScaffoldEntity,
    TCreateDto extends Partial<ScaffoldEntity>,
    TUpdateDto extends Partial<ScaffoldEntity>
> {
    public constructor(
        public readonly scaffoldEntity: ScaffoldEntityService<TEntity>,
        public readonly scaffoldDto: ScaffoldDtoService<
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

    public async remove(
        params: ScaffoldDeleteType['Param'],
        query: ScaffoldDeleteType['Query'],
        body: ScaffoldDeleteType['Body']
    ): ScaffoldDeleteType['Response'] {
        throw new Error('Not implemented');
    }
}
