import {ProjectDto} from '@/projects/_deprecated/dtos/project.dto';
import {PROJECT_EXTENSION} from '@/projects/_deprecated/project-old-files.service';
import {ProjectOldService} from '@/projects/_deprecated/project-old.service';
import {PROFILE_FILE_REGEX} from '@/projects/decorators/is-profile-name.decorator';
import {ProjectsHashService} from '@/projects/services/projects-hash.service';
import {ProjectsStorageService} from '@/projects/services/projects-storage.service';
import {
    BadRequestException,
    Inject,
    Injectable,
    Logger,
    NotFoundException,
    OnApplicationBootstrap,
    OnApplicationShutdown
} from '@nestjs/common';
import {promises as fs} from 'fs';
import path from 'path';

/**
 * @deprecated
 */
@Injectable()
export class ProjectsOldService
    implements OnApplicationBootstrap, OnApplicationShutdown
{
    private readonly log = new Logger('ProjectsService');

    /**
     * @deprecated this is lost on a hot-reload of code changes related to this service.
     *
     * We can move this to the global reference, and then do a dependency injection into the service, but
     * we might have problems related to hot reloading code referenced by projects in memory.
     *
     * We might need to stare open-state on disk, and reference it on startup.
     */
    private readonly open: Map<string, ProjectDto> = new Map();

    public constructor(
        @Inject(PROJECT_EXTENSION) private readonly extension: string,
        private readonly storage: ProjectsStorageService,
        private readonly hash: ProjectsHashService
    ) {}

    public onApplicationShutdown(signal?: string) {
        // TODO: Save open projects to disk
        this.log.log('Shutting down');
    }

    public onApplicationBootstrap() {
        // TODO: Load open projects from disk
        this.log.log('Starting up');
    }

    public async setOpen(id: string, open: boolean): Promise<ProjectDto> {
        const project = await this.getProjectOrThrow(id);
        project.open = open;
        if (open) {
            this.open.set(id, project);
        } else {
            this.open.delete(id);
        }
        return project;
    }

    public async rename(id: string, newName: string): Promise<ProjectDto> {
        if (this.isOpen(id)) {
            throw new BadRequestException(`Project with ID "${id}" is open`);
        }

        const project = await this.getProjectOrThrow(id);
        if (project.name === newName) {
            return project;
        }

        const newId = this.hash.hash(newName);

        if (await this.exists(newId)) {
            throw new BadRequestException(
                `Project with ID "${newId}" already exists`
            );
        }

        const newFileName = `${newName}.aigraphr`;
        const newFilePath = path.resolve(project.folder, newFileName);
        await fs.rename(project.path, newFilePath);

        return await this.getProjectOrThrow(newId);
    }

    public async create(name: string): Promise<ProjectDto> {
        const id = this.hash.hash(name);

        if (await this.exists(id)) {
            throw new BadRequestException(
                `Project with ID "${id}" already exists`
            );
        }

        const folder = await this.storage.path();
        const fileName = `${name}.aigraphr`;

        const connection = ProjectOldService.connect(
            path.resolve(folder, fileName)
        );
        await connection.authenticate();
        await connection.close();

        return this.getProjectOrThrow(id);
    }

    public isOpen(id: string) {
        return this.open.has(id);
    }

    public async exists(id: string): Promise<boolean> {
        return (await this.getProject(id)) !== undefined;
    }

    public async getProjectOrThrow(id: string): Promise<ProjectDto> {
        const project = await this.getProject(id);
        if (!project) {
            throw new NotFoundException(`Project with ID "${id}" not found`);
        }
        return project;
    }

    public async getProject(id: string): Promise<ProjectDto | undefined> {
        const projects = await this.getProjects();
        return projects.find((project) => project.id === id);
    }

    /**
     * @deprecated this will silently fail and return an empty array
     *
     * @todo change return to Promise<[ProjectDto[], error]>
     */
    public async getProjects(): Promise<ProjectDto[]> {
        const folder = await this.storage.path();
        const dir = await fs.opendir(folder);
        const files: ProjectDto[] = [];
        try {
            for await (const dirent of dir) {
                if (dirent.isFile() && dirent.name.endsWith(this.extension)) {
                    const filePath = path.resolve(folder, dirent.name);
                    const stats = await fs.stat(filePath);
                    const name = dirent.name.replace(
                        new RegExp(`${this.extension}$`),
                        ''
                    );
                    if (PROFILE_FILE_REGEX.test(name)) {
                        const id = this.hash.hash(name);
                        files.push({
                            id,
                            name,
                            fileName: dirent.name,
                            folder,
                            path: filePath,
                            size: stats.size,
                            createdAt: stats.birthtime,
                            open: this.open.has(id)
                        } satisfies ProjectDto);
                    }
                }
            }
        } catch (error) {
            this.log.error('Error while updating projects', error);
        }
        return files;
    }
}
