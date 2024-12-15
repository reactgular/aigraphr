import {ScaValidatorService} from '@/scaffold/crud/sca-validator.service';
import {ScaGetResponse} from '@/scaffold/decorators/sca-get';
import {ScaPaginateResponse} from '@/scaffold/decorators/sca-paginate';
import {ScaInvalidator} from '@/scaffold/dtos/sca-invalidator';
import {toHumanUtils} from '@/scaffold/utils/to-human.utils';
import {BadRequestException, Logger, Type} from '@nestjs/common';
import {DeepPartial, Repository} from 'typeorm';

export type ScaffoldEntity = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    id: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
};

export abstract class ScaCrudService<
    Entity extends ScaffoldEntity,
    TCreateDto extends object = never,
    TUpdateDto extends object = never
> implements ScaValidatorService<TCreateDto, TUpdateDto>
{
    private readonly name: string;

    private readonly scaLog: Logger;

    protected constructor(
        protected readonly repo: Repository<Entity>,
        protected readonly type: Type<Entity>
    ) {
        this.name = toHumanUtils(type.name);
        this.scaLog = new Logger(`ScaCrud::${this.name}`);

        // todo: look at this data later
        // @see https://github.com/woowabros/nestjs-library-crud/blob/main/src/lib/crud.service.ts
        // this.repo.metadata
    }

    public async onCreateValidate(
        invalidator: ScaInvalidator<TCreateDto>,
        data: TCreateDto
    ): Promise<void> {
        // do nothing
    }

    public async onUpdateValidate(
        invalidator: ScaInvalidator<TUpdateDto>,
        id: number,
        data: TUpdateDto
    ): Promise<void> {
        // TODO: make sure the record exists
        // do nothing
    }

    public async scaCreate(data: DeepPartial<Entity>): Promise<Entity> {
        const entity = this.repo.create(data);
        this.scaLog.debug(`Create:${JSON.stringify(entity)}`);
        const saved = await this.repo.save(entity);
        this.scaLog.debug(`Created:${JSON.stringify(saved)}`);
        return await this.scaGet(saved.id);
    }

    public async scaCreateValidate(
        data: TCreateDto
    ): Promise<ScaInvalidator<TCreateDto>> {
        const invalidator = new ScaInvalidator<TCreateDto>();

        this.scaLog.debug(`CreateValidate:${JSON.stringify(data)}`);
        await this.onCreateValidate(invalidator, data);

        return invalidator;
    }

    public async scaUpdateValidate(
        id: number,
        data: TUpdateDto
    ): Promise<ScaInvalidator<TUpdateDto>> {
        const invalidator = new ScaInvalidator<TUpdateDto>();

        this.scaLog.debug(`UpdateValidate:${JSON.stringify(data)}`);
        await this.onUpdateValidate(invalidator, id, data);

        return invalidator;
    }

    public async scaMustExist(id: Entity['id']): Promise<void | never> {
        this.scaLog.debug(`MustExist:${id}`);
        if (!(await this.scaExists(id))) {
            throw new BadRequestException(
                `${this.name} with ID ${id} does not exist`
            );
        }
    }

    public async scaExists(id: Entity['id']): Promise<boolean> {
        return await this.repo.exists({where: {id}});
    }

    public async scaGet(id: Entity['id']): ScaGetResponse<Entity> {
        this.scaLog.debug(`Get:${id}`);
        return await this.repo.findOneOrFail({where: {id}});
    }

    public async scaPaginate(): ScaPaginateResponse<Entity> {
        this.scaLog.debug(`Paginate`);
        return await this.repo.find();
    }
}
