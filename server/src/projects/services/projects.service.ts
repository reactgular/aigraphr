import {
    ProjectCreateDto,
    ProjectDto,
    ProjectEntity,
    ProjectUpdateDto
} from '@/entities/project.entity';
import {ProjectDataSourcesService} from '@/projects/services/project-data-sources.service';
import {ProjectsStorageService} from '@/projects/services/projects-storage.service';
import {ScaCrudService} from '@/scaffold/crud/sca-crud.service';
import {
    BadRequestException,
    Injectable,
    Logger,
    NotImplementedException
} from '@nestjs/common';
import {InternalServerErrorException} from '@nestjs/common/exceptions/internal-server-error.exception';
import {InjectRepository} from '@nestjs/typeorm';
import {DeepPartial, Not, Repository} from 'typeorm';

@Injectable()
export class ProjectsService extends ScaCrudService<
    ProjectEntity,
    ProjectDto,
    ProjectCreateDto,
    ProjectUpdateDto
> {
    private readonly log: Logger;

    public constructor(
        @InjectRepository(ProjectEntity)
        private readonly projects: Repository<ProjectEntity>,
        private readonly projectDataSources: ProjectDataSourcesService,
        private readonly projectsStorage: ProjectsStorageService
    ) {
        super(projects, ProjectEntity);

        this.log = new Logger('Projects');
    }

    public async clone(id: number, destName: string): Promise<number> {
        this.log.log(`Clone:${id}:${destName}`);

        const project = await this.scaGet(id);

        if (project.open) {
            throw new BadRequestException(
                `Cannot clone project ${id} because it is open`
            );
        } else if (await this.existsByName(destName)) {
            throw new BadRequestException(
                `Project with name ${destName} already exists`
            );
        }

        const [success, cause] = await this.projectsStorage.projectCopy(
            project.name,
            destName
        );

        if (success) {
            const entity = this.projects.create({name: destName});
            const saved = await this.projects.save(entity);
            return saved.id;
        } else {
            throw new InternalServerErrorException(
                `Failed to clone project ${id}`,
                {cause}
            );
        }
    }

    public async close(id: number): Promise<void> {
        this.log.log(`Close:${id}`);
        await this.projectDataSources.close(await this.getName(id));
    }

    public async create(name: string): Promise<number> {
        this.log.log(`Create:${name}`);

        await this.projectDataSources.open(name, false);

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

    public async isClosed(id: number): Promise<boolean> {
        return !(await this.isOpened(id));
    }

    public async isOpened(id: number): Promise<boolean> {
        const name = await this.getName(id);
        return this.projectDataSources.isOpen(name);
    }

    public async open(id: number): Promise<void> {
        this.log.log(`Open:${id}`);
        await this.projectDataSources.open(await this.getName(id), true);
    }

    public async remove(id: number): Promise<void> {
        this.log.log(`Remove:${id}`);

        throw new NotImplementedException();
    }

    public async rename(id: number, name: string): Promise<void> {
        this.log.log(`Rename:${id}:${name}`);

        throw new NotImplementedException();
    }

    protected fromCreateDto(
        createDto: ProjectCreateDto
    ): Omit<ProjectEntity, 'id'> {
        return {
            name: createDto.name
        };
    }

    protected fromUpdateDto(
        id: number,
        updateDto: ProjectUpdateDto
    ): DeepPartial<ProjectEntity> {
        return {
            id,
            ...(updateDto.name && {name: updateDto.name})
        };
    }

    protected toDto(entity: ProjectEntity): ProjectDto {
        return {
            ...entity,
            open: this.projectDataSources.isOpen(entity.name)
        };
    }
}
