import {ProjectEntity} from '@/entities/project.entity';
import {ScaCrudService} from '@/scaffold/crud/sca-crud.service';
import {Injectable, Logger, NotImplementedException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Not, Repository} from 'typeorm';

@Injectable()
export class ProjectsService extends ScaCrudService<ProjectEntity> {
    private readonly log: Logger;

    public constructor(
        @InjectRepository(ProjectEntity)
        private readonly projects: Repository<ProjectEntity>
    ) {
        super(projects, ProjectEntity);

        this.log = new Logger('Projects');
    }

    public async clone(id: number, name: string): Promise<number> {
        this.log.log(`Clone:${id}:${name}`);

        throw new NotImplementedException();
    }

    public async close(id: number): Promise<void> {
        this.log.log(`Close:${id}`);

        throw new NotImplementedException();
    }

    public async create(name: string): Promise<number> {
        this.log.log(`Create:${name}`);

        // TODO: create the SQlite database file first before saving the project

        const entity = this.projects.create({name});
        const saved = await this.projects.save(entity);

        this.log.log(`Created:${JSON.stringify(saved)}`);

        return saved.id;
    }

    public async existsByName(name: string, ignoreId?: number) {
        return ignoreId
            ? (await this.projects.count({
                  where: {
                      id: Not(ignoreId),
                      name
                  }
              })) > 0
            : (await this.projects.count({where: {name}})) > 0;
    }

    public async getName(id: number): Promise<string> {
        const {name} = await this.projects.findOneOrFail({
            where: {id},
            select: {name: true}
        });
        return name;
    }

    /**
     * Note: this method returns true if the project does not exist.
     */
    public async isClosed(id: number): Promise<boolean> {
        return !(await this.isOpened(id));
    }

    /**
     * Note: this method returns false if the project does not exist.
     */
    public async isOpened(id: number): Promise<boolean> {
        const count = await this.projects.count({where: {id, open: true}});
        return count === 1;
    }

    public async open(id: number): Promise<void> {
        this.log.log(`Open:${id}`);

        throw new NotImplementedException();
    }

    public async remove(id: number): Promise<void> {
        this.log.log(`Remove:${id}`);

        throw new NotImplementedException();
    }

    public async rename(id: number, name: string): Promise<void> {
        this.log.log(`Rename:${id}:${name}`);

        throw new NotImplementedException();
    }
}
