import {
    ProjectCreateDto,
    ProjectDto,
    ProjectEntity,
    ProjectUpdateDto
} from '@/entities/project.entity';
import {PROJECTS_STORAGE} from '@/projects/project.symbols';
import {ProjectDataSourcesService} from '@/projects/services/project-data-sources.service';
import {ProjectsStorage} from '@/projects/storages/projects-storage';
import {ScaCrudService} from '@/scaffold/crud/sca-crud.service';
import {BadRequestException, Inject, Injectable, Logger} from '@nestjs/common';
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
    private readonly log: Logger = new Logger('Projects');

    public constructor(
        @InjectRepository(ProjectEntity)
        private readonly projects: Repository<ProjectEntity>,
        private readonly projectDataSources: ProjectDataSourcesService,
        @Inject(PROJECTS_STORAGE)
        private readonly projectsStorage: ProjectsStorage
    ) {
        super(projects, ProjectEntity);
    }

    public async clone(id: number, destName: string): Promise<number> {
        this.log.log(`Clone:${id}:${destName}`);

        const project = await this.scaGet(id);

        if (project.open) {
            throw new BadRequestException(
                `Cannot clone project ${id} because it is open`
            );
        } else if (await this.existsByFileName(destName)) {
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
        await this.projectDataSources.close(await this.getFileName(id));
    }

    public async create(
        name: string,
        fileName: string,
        encrypted: boolean
    ): Promise<number> {
        this.log.log(`Create:${name}:${fileName}:${encrypted}`);

        await this.projectDataSources.open(fileName, false);

        const entity = this.projects.create({name, fileName, encrypted});
        const saved = await this.projects.save(entity);

        this.log.log(`Created:${JSON.stringify(saved)}`);

        return saved.id;
    }

    public async existsByFileName(fileName: string, ignoreId?: number) {
        return ignoreId
            ? (await this.projects.count({
                  where: {
                      id: Not(ignoreId),
                      fileName
                  }
              })) > 0
            : (await this.projects.count({where: {fileName}})) > 0;
    }

    public async getFileName(id: number): Promise<string> {
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
        const fileName = await this.getFileName(id);
        return this.projectDataSources.isOpen(fileName);
    }

    public async open(id: number): Promise<void> {
        this.log.log(`Open:${id}`);
        await this.projectDataSources.open(await this.getFileName(id), true);
    }

    public async remove(id: number): Promise<void> {
        this.log.log(`Remove:${id}`);

        const project = await this.scaGet(id);

        if (project.open) {
            throw new BadRequestException(
                `Cannot delete project ${id} because it is open`
            );
        }

        await this.projects.delete(id);
        const [success, cause] = await this.projectsStorage.projectRemove(
            project.name
        );

        if (!success) {
            const path = await this.projectsStorage.projectDatabase(
                project.name
            );
            throw new InternalServerErrorException(
                `Failed to remove project ${id} at ${path}`,
                {cause}
            );
        }
    }

    public async rename(id: number, newName: string): Promise<void> {
        this.log.log(`Rename:${id}:${newName}`);

        const project = await this.scaGet(id);

        if (project.open) {
            throw new BadRequestException(
                `Cannot rename project ${id} because it is open`
            );
        }

        const [success, cause] = await this.projectsStorage.projectRename(
            project.name,
            newName
        );

        if (success) {
            await this.projects.update(id, {name: newName});
        } else {
            const path = await this.projectsStorage.projectDatabase(
                project.name
            );
            throw new InternalServerErrorException(
                `Failed to rename project ${id} at ${path}`,
                {cause}
            );
        }
    }

    protected fromCreateDto(
        createDto: ProjectCreateDto
    ): Omit<ProjectEntity, 'id'> {
        return {
            name: createDto.name,
            fileName: createDto.fileName,
            encrypted: createDto.encrypted
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
