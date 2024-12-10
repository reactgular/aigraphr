import {Repository} from 'typeorm';

export type ScaffoldEntity = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    id: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
};

export abstract class ScaffoldCrudService<Entity extends ScaffoldEntity> {
    protected constructor(protected readonly repo: Repository<Entity>) {}

    public findAll(): Promise<Entity[]> {
        return this.repo.find();
    }

    public findOne(id: Entity['id']): Promise<Entity | null> {
        return this.repo.findOneBy({id});
    }

    public async remove(id: Entity['id']): Promise<void> {
        await this.repo.delete(id);
    }
}
