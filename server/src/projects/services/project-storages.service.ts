import {ProjectStorageDto} from '@/projects/dtos/project-storage.dto';
import {Inject, Injectable, Logger, Scope} from '@nestjs/common';
import * as crypto from 'crypto';
import {promises as fs} from 'fs';
import * as path from 'path';

export const PROJECT_STORAGE_NONCE = Symbol();

@Injectable({
    scope: Scope.REQUEST
})
export class ProjectStoragesService {
    private storage: Map<string, ProjectStorageDto> | null = null;

    public constructor(
        @Inject(PROJECT_STORAGE_NONCE) private readonly nonce: string
    ) {
        log.debug('ProjectStoragesService instantiated', nonce);
    }

    public async getAll(): Promise<ProjectStorageDto[]> {
        return (await this.getFiles()).sort(
            (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
        );
    }

    public async get(id: string): Promise<ProjectStorageDto | undefined> {
        return (await this.getStorage()).get(id);
    }

    private async getFiles(): Promise<ProjectStorageDto[]> {
        const storage = await this.getStorage();
        return Array.from(storage.values());
    }

    private async getStorage(): Promise<Map<string, ProjectStorageDto>> {
        if (this.storage === null) {
            // @TODO make the storage folder configurable
            await this.update(__dirname);
        }
        return this.storage;
    }

    private getId(fileName: string): string {
        const hash = crypto.createHash('sha256');
        hash.update(this.nonce + fileName, 'utf8');
        return hash.digest('hex');
    }

    private async update(folder: string): Promise<void> {
        const dir = await fs.opendir(folder);
        this.storage = new Map<string, ProjectStorageDto>();
        try {
            for await (const dirent of dir) {
                if (dirent.isFile() && dirent.name.endsWith('.js')) {
                    const filePath = path.join(folder, dirent.name);
                    const stats = await fs.stat(filePath);
                    const id = this.getId(dirent.name);
                    this.storage.set(id, {
                        id,
                        fileName: dirent.name,
                        createdAt: stats.birthtime
                    } satisfies ProjectStorageDto);
                }
            }
        } catch (error) {
            log.error('Error while updating storage', error);
        }
    }
}

const log = new Logger(ProjectStoragesService.name);
