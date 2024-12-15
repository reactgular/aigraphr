import {ScaGetResponse} from '@/scaffold/decorators/sca-get';
import {ScaPaginateResponse} from '@/scaffold/decorators/sca-paginate';
import {toHumanUtils} from '@/scaffold/utils/to-human.utils';
import {Logger, Type} from '@nestjs/common';
import {DeepPartial, Repository} from 'typeorm';

export type ScaffoldEntity = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    id: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
};

export abstract class ScaCrudService<Entity extends ScaffoldEntity> {
    private readonly name: string;

    private readonly log: Logger;

    protected constructor(
        protected readonly repo: Repository<Entity>,
        protected readonly type: Type<Entity>
    ) {
        this.name = toHumanUtils(type.name);
        this.log = new Logger(`ScaCrud::${this.name}`);

        // todo: look at this data later
        // @see https://github.com/woowabros/nestjs-library-crud/blob/main/src/lib/crud.service.ts
        // this.repo.metadata
    }

    public async scaCreate(data: DeepPartial<Entity>): Promise<Entity> {
        const entity = await this.repo.save(this.repo.create(data));
        return await this.scaGet(entity.id);
    }

    public async scaGet(id: Entity['id']): ScaGetResponse<Entity> {
        this.log.log(`Get:${id}`);
        return await this.repo.findOneOrFail({where: {id}});
    }

    public async scaPaginate(): ScaPaginateResponse<Entity> {
        this.log.log(`Paginate`);
        return await this.repo.find();
    }
}
