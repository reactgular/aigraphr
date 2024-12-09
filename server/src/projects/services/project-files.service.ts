import {EnvConfig} from '@/configs/env.config';
import {PROFILE_FILE_REGEX} from '@/projects/decorators/is-profile-name.decorator';
import {
    ProjectFileDto,
    ProjectFileWithInstanceDto
} from '@/projects/dtos/project-file.dto';
import {ProjectService} from '@/projects/services/project.service';
import {Inject, Injectable, Logger, NotFoundException} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import * as crypto from 'crypto';
import {promises as fs} from 'fs';
import * as path from 'path';

export const PROJECT_STORAGE_NONCE = Symbol();

export const PROJECT_EXTENSION = Symbol();

@Injectable()
export class ProjectFilesService {
    public constructor(
        @Inject(PROJECT_STORAGE_NONCE) private readonly nonce: string,
        @Inject(PROJECT_EXTENSION) private readonly extension: string,
        private config: ConfigService<EnvConfig>
    ) {}

    /**
     * @deprecated we won't use files services to create a new project.
     */
    public async create(name: string) {
        const storagePath = await this.storagePath();
        const fileName = `${name}.aigraphr`;
        const connection = ProjectService.connect(
            path.join(storagePath, fileName)
        );
        await connection.close();
    }

    public async getFileOrThrow(
        id: string
    ): Promise<ProjectFileDto | undefined> {
        const storage = await this.getFile(id);
        if (!storage) {
            throw new NotFoundException(
                `Project file with ID "${id}" not found`
            );
        }
        return storage;
    }

    public async getFile(id: string): Promise<ProjectFileDto | undefined> {
        const files = await this.getFiles();
        return files.find((file) => file.id === id);
    }

    /**
     * @todo filter out files that don't match the regex constraints for the fileName
     */
    public async getFiles(): Promise<ProjectFileWithInstanceDto[]> {
        const folder = await this.storagePath();
        const dir = await fs.opendir(folder);
        const files: ProjectFileWithInstanceDto[] = [];
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
                        const id = this.hashId(name);
                        files.push({
                            id,
                            name,
                            fileName: dirent.name,
                            folder,
                            path: filePath,
                            size: stats.size,
                            createdAt: stats.birthtime
                        } satisfies ProjectFileWithInstanceDto);
                    }
                }
            }
        } catch (error) {
            log.error('Error while updating storage', error);
        }
        return files;
    }

    private async storagePath(): Promise<string> {
        const storagePath = path.resolve(this.config.get('PROJECTS_FOLDER'));
        try {
            await fs.access(storagePath);
        } catch (error) {
            log.warn(`Storage path does not exist: ${storagePath}`, error);
            try {
                await fs.mkdir(storagePath, {recursive: true});
            } catch (error) {
                log.error('Error while creating storage path', error);
                throw error;
            }
        }
        return storagePath;
    }

    private hashId(fileName: string): string {
        const hash = crypto.createHash('sha256');
        hash.update(this.nonce + fileName, 'utf8');
        return hash.digest('hex');
    }
}

const log = new Logger(ProjectFilesService.name);
