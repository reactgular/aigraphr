import {ScaCrudCreate} from '@/scaffold/crud/sca-crud-create';
import {ScaCrudRead} from '@/scaffold/crud/sca-crud-read';
import {ScaCrudRemove} from '@/scaffold/crud/sca-crud-remove';
import {ScaEntity} from '@/scaffold/crud/sca-entity';
import {ScaGetResponse} from '@/scaffold/decorators/sca-get';
import {ScaPaginateResponse} from '@/scaffold/decorators/sca-paginate';
import {toHumanUtils} from '@/scaffold/utils/to-human.utils';
import {BadRequestException, Logger, Type} from '@nestjs/common';
import {DeepPartial, Repository} from 'typeorm';
import {ScaRemoveResponse} from '../decorators/sca-remove';

export abstract class ScaCrudService<
        TEntity extends ScaEntity,
        TDto extends ScaEntity,
        TCreateDto extends object,
        TUpdateDto extends object
    >
    implements ScaCrudCreate<TDto, TCreateDto>, ScaCrudRead<TDto>, ScaCrudRemove
{
    private readonly name: string;

    private readonly scaLog: Logger;

    protected constructor(
        protected readonly repo: Repository<TEntity>,
        protected readonly type: Type<TEntity>
    ) {
        this.name = toHumanUtils(type.name);
        this.scaLog = new Logger(`ScaCrud::${this.name}`);

        // todo: look at this data later
        // @see https://github.com/woowabros/nestjs-library-crud/blob/main/src/lib/crud.service.ts
        // this.repo.metadata
    }

    public async scaCreate(data: TCreateDto): Promise<TDto> {
        const entity = this.repo.create(this.fromCreateDto(data) as TEntity);
        this.scaLog.debug(`Create:${JSON.stringify(entity)}`);
        const saved = await this.repo.save(entity);
        this.scaLog.debug(`Created:${JSON.stringify(saved)}`);
        return await this.scaGet(saved.id);
    }

    public async scaExists(id: TEntity['id']): Promise<boolean> {
        return await this.repo.exists({where: {id}});
    }

    public async scaGet(id: TEntity['id']): ScaGetResponse<TDto> {
        this.scaLog.debug(`Get:${id}`);
        const entity = await this.repo.findOneOrFail({where: {id}});
        return this.toDto(entity);
    }

    public async scaMustExist(id: TEntity['id']): Promise<void | never> {
        this.scaLog.debug(`MustExist:${id}`);
        if (!(await this.scaExists(id))) {
            throw new BadRequestException(
                `${this.name} with ID ${id} does not exist`
            );
        }
    }

    public async scaPaginate(): ScaPaginateResponse<TDto> {
        this.scaLog.debug(`Paginate`);
        const entities = await this.repo.find();
        return entities.map((entity) => this.toDto(entity));
    }

    public async scaRemove(id: number): ScaRemoveResponse {
        this.scaLog.debug(`Remove:${id}`);
        await this.repo.delete(id);
    }

    public async scaUpdate(id: number, data: TUpdateDto): Promise<TDto> {
        const entity = this.fromUpdateDto(id, data);
        this.scaLog.debug(`Update:${JSON.stringify(entity)}`);
        const saved = await this.repo.save(entity);
        this.scaLog.debug(`Updated:${JSON.stringify(saved)}`);
        return this.toDto(saved);
    }

    protected abstract fromCreateDto(
        createDto: TCreateDto
    ): Omit<TEntity, 'id'>;

    protected abstract fromUpdateDto(
        id: number,
        updateDto: TUpdateDto
    ): DeepPartial<TEntity>;

    protected abstract toDto(entity: TEntity): TDto;
}
