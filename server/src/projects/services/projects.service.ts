import {
    ProjectCreateDto,
    ProjectEntity,
    ProjectUpdateDto
} from '@/entities/project.entity';
import {ScaCrudService} from '@/scaffold/crud/sca-crud.service';
import {ScaInvalidator} from '@/scaffold/dtos/sca-invalidator';
import {Injectable, Logger, NotImplementedException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Not, Repository} from 'typeorm';

@Injectable()
export class ProjectsService extends ScaCrudService<
    ProjectEntity,
    ProjectCreateDto,
    ProjectUpdateDto
> {
    private readonly log: Logger;

    public constructor(
        @InjectRepository(ProjectEntity)
        private readonly projects: Repository<ProjectEntity>
    ) {
        super(projects, ProjectEntity);

        this.log = new Logger('Projects');
    }

    public async onCreateValidate(
        invalidator: ScaInvalidator<ProjectCreateDto>,
        data: ProjectCreateDto
    ): Promise<void> {
        if (typeof data.cloneId === 'number') {
            if (!(await this.scaExists(data.cloneId))) {
                invalidator.notFound('cloneId', 'Project does not exist');
            }
        }

        const exists = await this.projects.count({
            where: {name: data.name}
        });

        if (exists > 0) {
            invalidator.notUnique(
                'name',
                'Project with the same name already exists'
            );
        }

        if (data.name.length < 3) {
            invalidator.invalid(
                'name',
                'Name must be at least 3 characters long'
            );
        }
    }

    public async onUpdateValidate(
        invalidator: ScaInvalidator<ProjectUpdateDto>,
        id: number,
        data: ProjectUpdateDto
    ): Promise<void> {
        const project = await this.projects.findOneByOrFail({id});

        if (data.name) {
            if (typeof data.open === 'boolean') {
                invalidator.invalid(
                    'name',
                    'Cannot change name and open status at the same time'
                );
            }

            if (data.name === project.name) {
                invalidator.badValue(
                    'name',
                    'Name must be different from the current name'
                );
            }

            if (data.name.length < 3) {
                invalidator.invalid(
                    'name',
                    'Name must be at least 3 characters long'
                );
            } else {
                const exists = await this.projects.count({
                    where: {
                        id: Not(project.id),
                        name: data.name
                    }
                });

                if (exists > 0) {
                    invalidator.notUnique(
                        'name',
                        'Project with the same name already exists'
                    );
                }
            }
        }
    }

    public async create(name: string): Promise<number> {
        this.log.log(`Create:${name}`);

        const entity = this.projects.create({name});
        const saved = await this.projects.save(entity);

        this.log.log(`Created:${JSON.stringify(saved)}`);

        return saved.id;
    }

    public async clone(id: number, name: string): Promise<number> {
        this.log.log(`Clone:${id}:${name}`);

        throw new NotImplementedException();
    }

    public async rename(id: number, name: string): Promise<void> {
        this.log.log(`Rename:${id}:${name}`);

        throw new NotImplementedException();
    }

    public async open(id: number): Promise<void> {
        this.log.log(`Open:${id}`);

        throw new NotImplementedException();
    }

    public async remove(id: number): Promise<void> {
        this.log.log(`Remove:${id}`);

        throw new NotImplementedException();
    }

    /**
     * Note: this method returns false if the project does not exist.
     */
    public async isOpened(id: number): Promise<boolean> {
        const count = await this.projects.count({where: {id, open: true}});
        return count === 1;
    }

    /**
     * Note: this method returns true if the project does not exist.
     */
    public async isClosed(id: number): Promise<boolean> {
        return !(await this.isOpened(id));
    }

    public async close(id: number): Promise<void> {
        this.log.log(`Close:${id}`);

        throw new NotImplementedException();
    }

    /**
     * @deprecated
     */
    public async existsByName(name: string) {
        return (await this.projects.count({where: {name}})) > 0;
    }
}
