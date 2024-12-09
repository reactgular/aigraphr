import {EnvConfig} from '@/configs/env.config';
import {ProjectDto} from '@/projects/dtos/project.dto';
import {Injectable, Logger} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {promises as fs} from 'fs';
import path from 'path';

@Injectable()
export class ProjectsService {
    private readonly cache: Map<string, ProjectDto> = new Map();

    private readonly log = new Logger(ProjectsService.name);

    public constructor(private config: ConfigService<EnvConfig>) {
        //...
    }

    public async projects(): Promise<Array<ProjectDto>> {
        return [];
    }

    private async getStoragePath(): Promise<string> {
        const storagePath = this.config.get('PROJECTS_FOLDER');
        try {
            await fs.access(storagePath);
        } catch (error) {
            this.log.warn(`Storage path does not exist: ${storagePath}`, error);
            try {
                await fs.mkdir(storagePath, {recursive: true});
            } catch (error) {
                this.log.error('Error while creating storage path', error);
                throw error;
            }
        }
        return storagePath;
    }

    private async update(folder: string): Promise<void> {
        const dir = await fs.opendir(folder);
        try {
            for await (const dirent of dir) {
                if (dirent.isFile() && dirent.name.endsWith('.aigraphr')) {
                    const filePath = path.join(folder, dirent.name);
                    const stats = await fs.stat(filePath);
                    const id = dirent.name;
                    if (!this.cache.has(id)) {
                        this.cache.set(id, {
                            id,
                            fileName: dirent.name,
                            createdAt: stats.birthtime,
                            opened: false
                        } satisfies ProjectDto);
                    }

                    // @todo we need to remove from the cache files that are now missing
                }
            }
        } catch (error) {
            this.log.error('Error while updating projects', error);
        }
    }
}
