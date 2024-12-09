import {PROFILE_FILE_REGEX} from '@/projects/decorators/is-profile-name.decorator';
import {ProjectDto} from '@/projects/dtos/project.dto';
import {PROJECT_EXTENSION} from '@/projects/services/project-files.service';
import {ProjectService} from '@/projects/services/project.service';
import {ProjectsHashService} from '@/projects/services/projects-hash.service';
import {ProjectsStorageService} from '@/projects/services/projects-storage.service';
import {
    BadRequestException,
    Inject,
    Injectable,
    Logger,
    NotFoundException
} from '@nestjs/common';
import {promises as fs} from 'fs';
import path from 'path';

@Injectable()
export class ProjectsService {
    private readonly log = new Logger('ProjectsService');

    private readonly open: Map<string, ProjectDto> = new Map();

    public constructor(
        @Inject(PROJECT_EXTENSION) private readonly extension: string,
        private readonly storage: ProjectsStorageService,
        private readonly hash: ProjectsHashService
    ) {}

    public async create(name: string): Promise<ProjectDto> {
        const id = this.hash.hash(name);

        if (await this.exists(id)) {
            throw new BadRequestException(
                `Project with ID "${id}" already exists`
            );
        }

        const folder = await this.storage.path();
        const fileName = `${name}.aigraphr`;

        const connection = ProjectService.connect(
            path.resolve(folder, fileName)
        );
        await connection.authenticate();
        await connection.close();

        return this.getProjectOrThrow(id);
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
                        files.push({
                            id: this.hash.hash(name),
                            name,
                            fileName: dirent.name,
                            folder,
                            path: filePath,
                            size: stats.size,
                            createdAt: stats.birthtime,
                            open: false
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
