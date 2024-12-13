import {toHumanUtils} from '@/scaffold/utils/to-human.utils';
import {NotFoundException, Type} from '@nestjs/common';
import {Repository} from 'typeorm';

export type ScaffoldDto = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    id: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
};

export type ScaffoldEntity = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    id: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
};

/**
 * @deprecated
 */
export abstract class ScaffoldEntityService<Entity extends ScaffoldEntity> {
    private readonly name: string;

    protected constructor(
        protected readonly repo: Repository<Entity>,
        protected readonly type: Type<Entity>
    ) {
        this.name = toHumanUtils(type);
    }

    public async findAll(): Promise<Entity[]> {
        return await this.repo.find();
    }

    public async create(data: Omit<Partial<Entity>, 'id'>): Promise<Entity> {
        const entity = this.repo.create({...data, id: undefined} as Entity);
        return await this.repo.save(entity, {reload: true});
    }

    public async update(
        id: Entity['id'],
        data: Omit<Entity, 'id'>
    ): Promise<Entity> {
        const entity = this.repo.create({...data, id} as Entity);
        return await this.repo.save(entity, {reload: true});
    }

    public async findOneOrThrow(id: Entity['id']): Promise<Entity> {
        const one = await this.repo.findOneBy({id});
        if (one) {
            return one;
        }
        this.throwNotFound(id);
    }

    public async findOne(id: Entity['id']): Promise<Entity | null> {
        return this.repo.findOneBy({id});
    }

    public async exists(id: number): Promise<boolean> {
        return !!(await this.findOne(id));
    }

    public async remove(id: Entity['id']): Promise<void> {
        if (!(await this.exists(id))) {
            this.throwNotFound(id);
        }
        await this.repo.delete(id);
    }

    protected throwNotFound(id: Entity['id']): never {
        throw new NotFoundException(`${this.name} with ID "${id}" not found`);
    }
}
